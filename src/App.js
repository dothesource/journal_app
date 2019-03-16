import React, { useState, useEffect, useRef } from 'react'
import './App.css'

import '@material/elevation/dist/mdc.elevation.css'
import Entry from './components/Entry'

const App = () => {
  const pageEndRef = useRef()
  const [entries, setEntries] = useState([])
  const [currentEntry, setCurrentEntry] = useState('')
  const getEntries = async () => {
    const response = await fetch('http://localhost:4000/entries.json')
    const entries = await response.json()
    setEntries(entries)
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
    }).then(() => {
      setEntries(entries.filter(e => entry.id !== e.id))
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
      .then(json => {
        setEntries([...entries, json])
        setCurrentEntry('')
        pageEndRef.current.scrollIntoView({ behavior: 'smooth' })
      })
  }

  useEffect(() => {
    fetch('http://localhost:4000/days.json', response => {
      return response.json()
    }).then(json => console.log(json))
    getEntries()
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
      {entries.map(entry => (
        <Entry key={entry.id} entry={entry} deleteEntry={deleteEntry} />
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
