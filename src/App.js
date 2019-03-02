import React, { useState, useEffect } from 'react'
import './App.css'

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

  return <div className="container">{entries.map(entry => entry.text)}</div>
}

export default App
