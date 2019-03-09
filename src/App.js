import React, { useState, useEffect } from 'react'
import './App.css'
import '@material/react-card/dist/card.css'
import '@material/elevation/dist/mdc.elevation.css'
import Card from '@material/react-card'

const App = () => {
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
  const saveEntry = async () => {
    const response = await fetch('http://localhost:4000/entries.json', {
      method: 'POST',
      body: JSON.stringify({ entry: { text: currentEntry } })
    })
    const responseJson = await response.json()
    console.log(responseJson)
  }

  useEffect(() => {
    getEntries()
  }, [])

  return (
    <div className="container">
      <div className="app-bar mdc-elevation--z4">
        <div className="app-bar-title">Entries</div>
      </div>
      {entries.map(entry => (
        <Card key={entry.id} className="card">
          <p>{entry.text}</p>
        </Card>
      ))}
      <div className="footer-bar mdc-elevation--z4">
        <input
          type="text"
          placeholder="Add an entry..."
          className="input"
          onChange={handleInputChange}
        />
        <i onClick={saveEntry} className="icon material-icons">
          send
        </i>
      </div>
    </div>
  )
}

export default App
