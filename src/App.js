import React, { useState, useEffect } from 'react'
import './App.css'
import '@material/react-card/dist/card.css'

import Card from '@material/react-card'

const App = () => {
  const [entries, setEntries] = useState([])

  const getEntries = async () => {
    const response = await fetch('http://localhost:4000/entries.json')
    const entries = await response.json()
    setEntries(entries)
  }

  useEffect(() => {
    getEntries()
  }, [])

  return (
    <div>
      <div className="app-bar">
        <div className="app-bar-title">Entries</div>
      </div>
      {entries.map(entry => (
        <Card key={entry.id} className="card">
          <p>{entry.text}</p>
        </Card>
      ))}
    </div>
  )
}

export default App
