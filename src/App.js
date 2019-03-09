import React, { useState, useEffect } from 'react'
import './App.css'
import '@material/react-card/dist/card.css'
import '@material/elevation/dist/mdc.elevation.css'
import Card, {
  CardActions,
  CardActionIcons,
  CardPrimaryContent
} from '@material/react-card'

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

  const deleteEntry = entry => {
    fetch(`http://localhost:4000/entries/${entry.id}`, {
      method: 'DELETE'
    }).then(() => {
      setEntries(entries.filter(e => entry.id !== e.id))
    })
  }

  const saveEntry = async () => {
    const response = await fetch('http://localhost:4000/entries.json', {
      method: 'POST',
      body: JSON.stringify({ entry: { text: currentEntry } }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseJson = await response.json()
    setEntries([...entries, responseJson])
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
          <CardPrimaryContent>
            <p>{entry.text}</p>
          </CardPrimaryContent>
          <CardActions>
            <CardActionIcons>
              <i onClick={() => deleteEntry(entry)} className="material-icons">
                delete
              </i>
            </CardActionIcons>
          </CardActions>
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
