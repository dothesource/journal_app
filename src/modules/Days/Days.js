import React, { useState, useEffect, useRef, useContext } from 'react'
import api from '../../utils/api'
import { last } from '../../utils/generic'
import useKeyPress from '../../utils/use_key_press'
import { Store } from '../../store'
import Loader from 'react-loader-spinner'
import {
  daysActions,
  saveActions,
  updateActions,
  archiveActions
} from '../../store/reducers/days'
import DayList from './DayList'
import AppBar from '../../components/AppBar'
import Container from '../../components/Container'
import styled from 'styled-components'
import Footer from './Footer'
const NEW_ENTRY_DELAY = 5 * 60 * 1000

const SelfCentered = styled.div`
  align-self: center;
`

const Days = () => {
  const {
    state: { days, daysLoading },
    dispatch
  } = useContext(Store)
  const pageEndRef = useRef()
  const inputRef = useRef()
  const [shouldCreateNewEntry, setShouldCreateNewEntry] = useState(true)
  const [currentEntry, setCurrentEntry] = useState('')

  const handleInputChange = event => {
    setCurrentEntry(event.target.value)
  }

  const saveEntry = async () => {
    dispatch(saveActions.init())
    return new Promise(resolve => {
      api
        .saveEntry(currentEntry)
        .then(day => {
          dispatch(saveActions.success(day))
          setCurrentEntry('')
          pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
          setShouldCreateNewEntry(false)
          resolve()
        })
        .catch(e => dispatch(saveActions.failure(e)))
    })
  }

  const updateEntryText = (entry, text) => {
    dispatch(updateActions.init())
    return new Promise(async (resolve, reject) => {
      api
        .updateEntry(entry, text)
        .then(() => {
          dispatch(updateActions.success({ entry, text }))
          resolve()
        })
        .catch(e => {
          dispatch(updateActions.failure(e))
          reject(e)
        })
    })
  }

  const archiveEntry = entry => {
    dispatch(archiveActions.init())
    api
      .archiveEntry(entry)
      .then(day => {
        dispatch(archiveActions.success(day))
        const last_day = last(days)
        const last_entry = !!last_day ? last(last_day.entries) : undefined
        if (last_entry !== undefined && entry.id === last_entry.id) {
          setShouldCreateNewEntry(true)
        }
      })
      .catch(e => dispatch(archiveActions.failure(e)))
  }

  useEffect(() => {
    const getDays = async () => {
      dispatch(daysActions.init())
      api
        .getDays()
        .then(days => {
          dispatch(daysActions.success(days))
          pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(e => dispatch(daysActions.failure(e)))
    }
    getDays()
  }, [dispatch])

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

  const saveEntryToPrev = () => {
    if (shouldCreateNewEntry === true || shiftPressed) {
      saveEntry()
    } else {
      updatePreviousEntry()
    }
  }

  const _handleKeyPress = e => {
    if (shouldCreateNewEntry === false) {
      setShouldCreateNewEntry(false)
      delayNewEntry()
    }
    if (e.key === 'Enter' && focused) {
      saveEntryToPrev()
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
    <div>
      <AppBar
        title="Entries"
        actions={[{ onClick: addEmptyEntry, iconName: 'add' }]}
      />
      <Container>
        {daysLoading ? (
          <SelfCentered>
            <Loader type="ThreeDots" color="#282c34" height="100" width="100" />
          </SelfCentered>
        ) : (
          <DayList
            days={days}
            updateEntryText={updateEntryText}
            archiveEntry={archiveEntry}
          />
        )}

        <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
        <Footer
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          handleInputChange={handleInputChange}
          handleKeyPress={_handleKeyPress}
          currentEntry={currentEntry}
          saveEntry={saveEntryToPrev}
        />
      </Container>
    </div>
  )
}

export default Days
