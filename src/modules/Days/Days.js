import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'
import { makeRequest } from '../../utils/api'
import '@material/elevation/dist/mdc.elevation.css'
import Day from '../../components/Day'
import { last } from '../../utils/generic'
import useKeyPress from '../../utils/use_key_press'
import { Store } from '../../store'
import {
  initDays,
  daysSuccess,
  daysFailure,
  initSave,
  saveSuccess,
  saveFailure,
  updateSuccess,
  initUpdate,
  updateFailure,
  initArchive,
  archiveFailure,
  archiveSuccess
} from '../../store/stores/days'
import { reject } from 'q'

const NEW_ENTRY_DELAY = 5 * 60 * 1000

const Days = () => {
  const {
    state: { days },
    dispatch
  } = React.useContext(Store)
  const pageEndRef = useRef()
  const inputRef = useRef()
  const [shouldCreateNewEntry, setShouldCreateNewEntry] = useState(true)
  const [currentEntry, setCurrentEntry] = useState('')
  const getDays = async () => {
    dispatch(initDays())
    makeRequest({ path: 'days.json', cacheId: 'days' })
      .then(days => {
        dispatch(daysSuccess(days))
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
      .catch(e => dispatch(daysFailure(e)))
  }

  const handleInputChange = event => {
    setCurrentEntry(event.target.value)
  }

  const saveEntry = async () => {
    dispatch(initSave())
    return new Promise(resolve => {
      makeRequest({
        path: 'entries.json',
        method: 'POST',
        body: { entry: { text: currentEntry } }
      })
        .then(day => {
          dispatch(saveSuccess(day))
          setCurrentEntry('')
          pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
          setShouldCreateNewEntry(false)
          resolve()
        })
        .catch(e => dispatch(saveFailure(e)))
    })
  }

  const updateEntryText = (entry, text) => {
    dispatch(initUpdate())
    return new Promise(async resolve => {
      await makeRequest({
        path: `/entries/${entry.id}.json`,
        method: 'PUT',
        body: { entry: { text: text } }
      })
        .then(() => {
          dispatch(updateSuccess({ entry, text }))
          resolve()
        })
        .catch(e => {
          dispatch(updateFailure(e))
          reject(e)
        })
    })
  }

  const archiveEntry = entry => {
    dispatch(initArchive)
    makeRequest({
      path: `entries/${entry.id}/archive.json`,
      method: 'PUT'
    })
      .then(day => {
        console.log(day)
        dispatch(archiveSuccess(day))
        const last_day = last(days)
        const last_entry = !!last_day ? last(last_day.entries) : undefined
        if (last_entry !== undefined && entry.id === last_entry.id) {
          setShouldCreateNewEntry(true)
        }
      })
      .catch(e => dispatch(archiveFailure(e)))
  }

  useEffect(() => {
    getDays()
  }, [])

  const updatePreviousEntry = async () => {
    const lastDay = last(days)
    if (lastDay !== undefined) {
      const recentDayEntries = lastDay.entries
      const recentEntry = last(recentDayEntries)
      if (recentEntry !== undefined) {
        await updateEntryText(
          recentEntry,
          `${recentEntry.text}\n${currentEntry}`
        )
        setCurrentEntry('')
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    saveEntry()
  }

  const timeOutRef = useRef(null)
  const delayNewEntry = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    timeOutRef.current = setTimeout(() => {
      setShouldCreateNewEntry(true)
    }, NEW_ENTRY_DELAY)
  }

  useEffect(() => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
      }
    }
  }, [])

  const shiftPressed = useKeyPress('Shift')

  const _handleKeyPress = e => {
    if (shouldCreateNewEntry === false) {
      setShouldCreateNewEntry(false)
      delayNewEntry()
    }
    if (e.key === 'Enter' && focused) {
      if (shouldCreateNewEntry === true || shiftPressed) {
        saveEntry()
      } else {
        updatePreviousEntry()
      }
    }
  }

  const [focused, setFocused] = useState(false)
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  const addEmptyEntry = () => {
    saveEntry().then(() => {
      if (inputRef.current) inputRef.current.focus()
      if (pageEndRef.current)
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Entries</div>
        <div>
          <i onClick={addEmptyEntry} className="app-bar-icon material-icons">
            add
          </i>
        </div>
      </div>
      {days.map(day => (
        <Day
          key={`day-${day.id}`}
          day={day}
          updateEntryText={updateEntryText}
          archiveEntry={archiveEntry}
        />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
      <div className="footer-bar mdc-elevation--z4">
        <input
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          placeholder="Add an entry..."
          className="input"
          onChange={handleInputChange}
          onKeyPress={_handleKeyPress}
          value={currentEntry}
        />
        <i onClick={saveEntry} className="icon material-icons">
          send
        </i>
      </div>
    </div>
  )
}

export default Days