import React, { useState, useEffect } from 'react'
import './App.css'
import '@material/react-card/dist/card.css'
import '../node_modules/@material/elevation/dist/mdc.elevation.css'
import Card from '@material/react-card'

const App = () => {
  const [entries, setEntries] = useState([])

  const getEntries = async () => {
    // const response = await fetch('http://localhost:4000/entries.json')
    // const response = await fetch('http://192.168.1.67:4000/entries.json')

    // const entries = await response.json()
    // setEntries(entries)
    setEntries([
      { id: 1, text: 'test' },
      { id: 2, text: 'example' },
      { id: 3, text: 'other' }
    ])
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
        <input type="text" placeholder="Add an entry..." className="input" />
      </div>
    </div>
  )
}

export default App
