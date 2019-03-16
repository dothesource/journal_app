import React, { useState } from 'react'
import Card, { CardActions, CardActionIcons } from '@material/react-card'
import '@material/react-card/dist/card.css'
import TextareaAutosize from 'react-textarea-autosize'

const Entry = ({ entry, deleteEntry }) => {
  const [text, setText] = useState(entry.text)
  return (
    <Card className="card">
      <TextareaAutosize
        useCacheForDOMMeasurements
        style={{
          outline: 'none',
          border: 'none',
          resize: 'none',
          fontFamily: 'Roboto',
          fontSize: '16px'
        }}
        onChange={({ target: { value } }) => {
          setText(value)
          console.log(value)
        }}
        defaultValue={text}
      />
      <CardActions>
        <CardActionIcons>
          <i onClick={() => deleteEntry(entry)} className="material-icons">
            delete
          </i>
        </CardActionIcons>
      </CardActions>
    </Card>
  )
}

export default Entry
