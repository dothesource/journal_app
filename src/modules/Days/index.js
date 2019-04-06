import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'
import { makeRequest, setCached } from '../../utils/api'
import '@material/elevation/dist/mdc.elevation.css'
import Day from '../../components/Day'
import { last } from '../../utils/generic'

const NEW_ENTRY_DELAY = 5 * 60 * 1000

const Days = () => {
  const pageEndRef = useRef()
  const [shouldCreateNewEntry, setShouldCreateNewEntry] = useState(true)
  const [days, setDays] = useState([])
  const [currentEntry, setCurrentEntry] = useState('')
  const getDays = async () => {
    makeRequest({ path: 'days.json', cacheId: 'days' }).then(days => {
      setDays(days)
      pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const handleInputChange = event => {
    setCurrentEntry(event.target.value)
  }

  const deleteEntry = entry => {
    makeRequest({ path: `entries/${entry.id}.json`, method: 'DELETE' }).then(
      day => {
        const days_for_update = [...days]
        const index = days_for_update.findIndex(d => d.id === day.id)
        if (index !== -1) {
          days_for_update[index] = day
        } else {
          days_for_update.push(day)
        }
        setDays(days_for_update)
        setCached('days', days_for_update)
      }
    )
  }

  const saveEntry = () => {
    makeRequest({
      path: 'entries.json',
      method: 'POST',
      body: { entry: { text: currentEntry } }
    }).then(day => {
      const days_for_update = [...days]
      const index = days_for_update.findIndex(d => d.id === day.id)
      if (index !== -1) {
        days_for_update[index] = day
      } else {
        days_for_update.push(day)
      }
      setDays(days_for_update)
      setCached('days', days_for_update)
      setCurrentEntry('')
      pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldCreateNewEntry(false)
    })
  }

  const updateEntryText = async (entry, text) => {
    const new_entry = await makeRequest({
      path: `/entries/${entry.id}.json`,
      method: 'PUT',
      body: { entry: { text: text } }
    })
    const days_for_update = [...days]
    const day_to_update = days_for_update.find(d => d.id === new_entry.day_id)
    const entry_to_update = day_to_update.entries.find(
      e => e.id === new_entry.id
    )
    entry_to_update.text = text
    setDays(days_for_update)
    setCached('days', days_for_update)
  }

  const archiveEntry = entry => {
    makeRequest({
      path: `entries/${entry.id}/archive.json`,
      method: 'PUT'
    }).then(day => {
      const days_for_update = [...days]
      const index = days_for_update.findIndex(d => d.id === day.id)
      if (index !== -1) {
        days_for_update[index] = day
      } else {
        days_for_update.push(day)
      }
      setDays(days_for_update)
      setCached('days', days_for_update)
    })
  }

  const unarchiveEntry = entry => {
    makeRequest({
      path: `entries/${entry.id}/unarchive.json`,
      method: 'PUT'
    }).then(day => {
      const days_for_update = [...days]
      const index = days_for_update.findIndex(d => d.id === day.id)
      if (index !== -1) {
        days_for_update[index] = day
      } else {
        days_for_update.push(day)
      }
      setDays(days_for_update)
      setCached('days', days_for_update)
    })
  }

  useEffect(() => {
    getDays()
  }, [])

  const updatePreviousEntry = () => {
    const lastDay = last(days)
    if (lastDay !== undefined) {
      const recentDayEntries = lastDay.entries
      const recentEntry = last(recentDayEntries)
      if (recentEntry !== undefined) {
        updateEntryText(recentEntry, `${recentEntry.text}\n${currentEntry}`)
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
  const _handleKeyPress = e => {
    if (shouldCreateNewEntry === false) {
      delayNewEntry()
    }
    if (e.key === 'Enter' && focused) {
      if (shouldCreateNewEntry === true) {
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

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Entries</div>
      </div>
      {days.map(day => (
        <Day
          key={`day-${day.id}`}
          day={day}
          deleteEntry={deleteEntry}
          updateEntryText={updateEntryText}
          archiveEntry={archiveEntry}
          unarchiveEntry={unarchiveEntry}
        />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
      <div className="footer-bar mdc-elevation--z4">
        <input
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
