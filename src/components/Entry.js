import React, { useState, useRef, useEffect, Fragment } from 'react'
import Card, { CardActions, CardActionIcons } from '@material/react-card'
import '@material/react-card/dist/card.css'
import TextareaAutosize from 'react-textarea-autosize'
import useDebounce from '../utils/use_debounce'
import MaterialIcon from '../components/MaterialIcon'
import styled from 'styled-components'

const CardIcon = styled(MaterialIcon)`
  color: grey;
  padding: 8px;
  cursor: pointer;
`

const EntryCard = styled(Card)`
  min-height: 56px;
  margin: 16px 0;
  padding: 16px;
  width: 100%;
`

const TextArea = styled(TextareaAutosize)`
  outline: none;
  border: none;
  resize: none;
  font-family: Roboto;
  font-size: 16px;
`
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
  }, [debouncedTextEdit, entry, focused, text, updateEntryText])

  useEffect(() => {
    if (entry.text !== text && focused === false) {
      setText(entry.text)
    }
  }, [entry.text, text, focused])
  const onFocus = () => {
    setFocused(true)
  }
  const onBlur = () => {
    setFocused(false)
  }

  const onUnArchive = () => unarchiveEntry(entry)
  const onDelete = () => deleteEntry(entry)
  const onArchive = () => archiveEntry(entry)

  const cardActionButtons = () => {
    if (isArchived) {
      return (
        <Fragment>
          <CardIcon onClick={onUnArchive}>unarchive</CardIcon>
          <CardIcon onClick={onDelete}>delete</CardIcon>
        </Fragment>
      )
    } else {
      return <CardIcon onClick={onArchive}>archive</CardIcon>
    }
  }

  return (
    <EntryCard onClick={focusTextArea}>
      <TextArea
        onFocus={onFocus}
        onBlur={onBlur}
        inputRef={inputRef}
        useCacheForDOMMeasurements
        onChange={({ target: { value } }) => {
          setText(value)
        }}
        value={text}
      />
      <CardActions>
        <CardActionIcons>{cardActionButtons()}</CardActionIcons>
      </CardActions>
    </EntryCard>
  )
}

export default Entry
