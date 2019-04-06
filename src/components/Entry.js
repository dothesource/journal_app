import React, { useState, useRef, useEffect } from 'react'
import Card, { CardActions, CardActionIcons } from '@material/react-card'
import '@material/react-card/dist/card.css'
import TextareaAutosize from 'react-textarea-autosize'
import useDebounce from '../utils/use_debounce'
const Entry = ({
  entry,
  deleteEntry,
  updateEntryText,
  archiveEntry,
  unarchiveEntry,
  isArchived
}) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const focusTextArea = () => {
    inputRef.current.focus()
  }
  const [text, setText] = useState(entry.text)
  const debouncedTextEdit = useDebounce(text, 500)

  useEffect(() => {
    if (debouncedTextEdit && text !== entry.text && focused) {
      updateEntryText(entry, debouncedTextEdit)
    }
  }, [debouncedTextEdit])

  useEffect(() => {
    if (entry.text !== text && focused === false) {
      setText(entry.text)
    }
  })
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  let archiveButton, unarchiveButton, deleteButton;
  if(isArchived) {
    unarchiveButton = (<i onClick={() => unarchiveEntry(entry)} className="material-icons">unarchive</i>);
    deleteButton = (<i onClick={() => deleteEntry(entry)} className="material-icons">delete</i>);
  } else {
    archiveButton = (<i onClick={() => archiveEntry(entry)} className="material-icons">archive</i>);
  }

  return (
    <Card className="card" onClick={focusTextArea}>
      <TextareaAutosize
        onFocus={onFocus}
        onBlur={onBlur}
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
        value={text}
      />
      <CardActions>
        <CardActionIcons>
          {archiveButton}
          {unarchiveButton}
          {deleteButton}
        </CardActionIcons>
      </CardActions>
    </Card>
  )
}

export default Entry
