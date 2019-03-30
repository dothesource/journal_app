import React, { useState, useRef, useEffect } from 'react'
import Card, { CardActions, CardActionIcons } from '@material/react-card'
import '@material/react-card/dist/card.css'
import TextareaAutosize from 'react-textarea-autosize'
import useDebounce from '../utils/use_debounce'
const Entry = ({ entry, deleteEntry, updateEntryText, archiveEntry, unarchiveEntry }) => {
  const inputRef = useRef(null)
  const focusTextArea = () => {
    inputRef.current.focus()
  }
  const [text, setText] = useState(entry.text)
  const [isSaving, setIsSaving] = useState(false)

  const debouncedTextEdit = useDebounce(text, 500)
  useEffect(
    () => {
      if (debouncedTextEdit && text !== entry.text) {
        setIsSaving(true)
        updateEntryText(entry, debouncedTextEdit).then(() => {
          setIsSaving(false)
        })
      }
    },
    [debouncedTextEdit] // Only call effect if debounced search term changes
  )

  return (
    <Card className="card" onClick={focusTextArea}>
      <TextareaAutosize
        inputRef={inputRef}
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
        }}
        defaultValue={text}
      />
      <CardActions>
        <CardActionIcons>
          <i onClick={() => deleteEntry(entry)} className="material-icons">
            delete
          </i>
          <i onClick={() => archiveEntry(entry)} className="material-icons">
            archive
          </i>

        </CardActionIcons>
      </CardActions>
    </Card>
  )
}

export default Entry
