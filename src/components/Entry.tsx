import React, { useState, useRef, useEffect, Fragment } from 'react'
import Card, { CardActions, CardActionIcons } from '@material/react-card'
import '@material/react-card/dist/card.css'
import TextareaAutosize from 'react-textarea-autosize'
import useDebounce from '../utils/use_debounce'
import MaterialIcon from './MaterialIcon'
import styled from 'styled-components'
import { IEntry } from '../interfaces/IEntry'

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

interface EntryProps {
  entry: IEntry
  deleteEntry?: Function
  updateEntryText?: Function
  archiveEntry?: Function
  unarchiveEntry?: Function
  isArchived?: boolean
  noActions?: boolean
  entryOnClick?: Function
}

const Entry = ({
  entry,
  deleteEntry,
  updateEntryText,
  archiveEntry,
  unarchiveEntry,
  isArchived,
  noActions,
  entryOnClick
}: EntryProps) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const focusTextArea = () => {
    if (inputRef) inputRef.current!.focus()
  }
  const [text, setText] = useState(entry.text)
  const debouncedTextEdit = useDebounce(text, 500)

  useEffect(() => {
    if (
      debouncedTextEdit &&
      text !== entry.text &&
      focused &&
      updateEntryText
    ) {
      updateEntryText(entry, text)
    }
  }, [debouncedTextEdit, entry, focused, isArchived, text, updateEntryText])

  useEffect(() => {
    if (entry.text !== text && focused === false) {
      setText(entry.text)
    }
  }, [entry.text, focused, text])

  const onFocus = () => {
    setFocused(true)
  }

  const onBlur = () => {
    setFocused(false)
  }

  const onUnArchive = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (unarchiveEntry) unarchiveEntry(entry)
  }

  const onDelete = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (deleteEntry) deleteEntry(entry)
  }

  const onArchive = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (archiveEntry) archiveEntry(entry)
  }

  const cardActionButtons = () => {
    if (noActions) return
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
    <EntryCard
      onClick={e => (entryOnClick ? entryOnClick(e) : focusTextArea())}
    >
      <TextArea
        onFocus={onFocus}
        onBlur={onBlur}
        inputRef={inputRef}
        useCacheForDOMMeasurements
        onChange={({ target: { value } }: any) => {
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
