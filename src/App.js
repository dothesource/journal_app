import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [entries, setEntries] = useState([])
  fetch('http://localhost:4000/entries.json', {})
    .then(response => response.json())
    .then(entries => setEntries(entries))
  return <div className="container">{entries.map(entry => entry.text)}</div>
}

export default App
