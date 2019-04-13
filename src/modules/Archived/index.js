import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'
import { makeRequest, setCached } from '../../utils/api'
import '@material/elevation/dist/mdc.elevation.css'
import Day from '../../components/Day'

const Archived = () => {
  const pageEndRef = useRef()
  const [archivedEntriesDays, setArchivedEntriesDays] = useState([])
  const getArchivedEntriesDays = async () => {
    makeRequest({ path: 'days/archived.json', cacheId: 'days' }).then(days => {
      setArchivedEntriesDays(days)
      pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }

  useEffect(() => {
    getArchivedEntriesDays()
  }, [])

  const deleteEntry = entry => {
    makeRequest({ path: `entries/${entry.id}.json`, method: 'DELETE' }).then(
      day => {
        const days_for_update = [...archivedEntriesDays]
        const index = days_for_update.findIndex(d => d.id === day.id)
        if (index !== -1) {
          days_for_update[index] = day
        } else {
          days_for_update.push(day)
        }
        setArchivedEntriesDays(days_for_update)
        setCached('days', days_for_update)
      }
    )
  }

  const updateEntryText = async (entry, text) => {
    const new_entry = await makeRequest({
      path: `/entries/${entry.id}.json`,
      method: 'PUT',
      body: { entry: { text: text } }
    })
    const days_for_update = [...archivedEntriesDays]
    const day_to_update = days_for_update.find(d => d.id === new_entry.day_id)
    const entry_to_update = day_to_update.entries.find(
      e => e.id === new_entry.id
    )
    entry_to_update.text = text
    setArchivedEntriesDays(days_for_update)
    setCached('days', days_for_update)
  }

  const archiveEntry = entry => {
    makeRequest({
      path: `entries/${entry.id}/archive.json`,
      method: 'PUT'
    }).then(day => {
      const days_for_update = [...archivedEntriesDays]
      const index = days_for_update.findIndex(d => d.id === day.id)
      if (index !== -1) {
        days_for_update[index] = day
      } else {
        days_for_update.push(day)
      }
      setArchivedEntriesDays(days_for_update)
      setCached('days', days_for_update)
    })
  }

  const unarchiveEntry = entry => {
    makeRequest({
      path: `entries/${entry.id}/unarchive.json`,
      method: 'PUT'
    }).then(day => {
      const days_for_update = [...archivedEntriesDays]
      const index = days_for_update.findIndex(d => d.id === day.id)
      if (index !== -1) {
        days_for_update[index] = day
      } else {
        days_for_update.push(day)
      }
      setArchivedEntriesDays(days_for_update)
      setCached('days', days_for_update)
    })
  }

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Archived</div>
      </div>
      {archivedEntriesDays.map(day => (
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
    </div>
  )
}

export default Archived
