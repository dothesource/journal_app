import React, { useState, useEffect, useRef } from 'react'
import './App.css'

import '@material/elevation/dist/mdc.elevation.css'
import Day from './components/Day'

const App = () => {
  const pageEndRef = useRef()
  const [days, setDays] = useState([])
  const [currentEntry, setCurrentEntry] = useState('')
  const getDays = async () => {
    fetch('http://localhost:4000/days.json')
      .then(response => response.json())
      .then(days => {
        setDays(days)
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
  }

  const handleInputChange = event => {
    setCurrentEntry(event.target.value)
  }

  const deleteEntry = entry => {
    fetch(`http://localhost:4000/entries/${entry.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(day => {
        const days_for_update = [...days]
        const index = days_for_update.findIndex(d => d.id === day.id)
        if (index !== -1) {
          days_for_update[index] = day
        } else {
          days_for_update.push(day)
        }
        setDays(days_for_update)
      })
  }

  const saveEntry = () => {
    fetch('http://localhost:4000/entries.json', {
      method: 'POST',
      body: JSON.stringify({ entry: { text: currentEntry } }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(day => {
        const days_for_update = [...days]
        const index = days_for_update.findIndex(d => d.id === day.id)
        if (index !== -1) {
          days_for_update[index] = day
        } else {
          days_for_update.push(day)
        }
        setDays(days_for_update)
        setCurrentEntry('')
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
  }

  useEffect(() => {
    getDays()
  }, [])

  const _handleKeyPress = e => {
    if (e.key === 'Enter') {
      saveEntry()
    }
  }

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Entries</div>
      </div>
      {days.map(day => (
        <Day key={day.id} day={day} deleteEntry={deleteEntry} />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={pageEndRef} />
      <div className="footer-bar mdc-elevation--z4">
        <input
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

export default App
