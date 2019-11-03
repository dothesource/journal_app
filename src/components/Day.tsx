import React, { Fragment, useMemo, useContext } from 'react'
import Entry from './Entry'
import styled from 'styled-components'
import { IEntry } from '../interfaces/IEntry'
import { IDay } from '../interfaces/IDay'
import { actionUpdateEntry } from '../store/reducers/days'
import { Store } from '../store'
import { arrayIsValid } from '../utils/generic'

const DayTitle = styled.h5`
  user-select: none;
`

const Day = ({
  day,
  showArchived = false,
  ...props
}: {
  day: IDay
  showArchived?: boolean
  [key: string]: any
}) => {
  const entries: IEntry[] = day.entries
  const eFilter = showArchived
    ? (entry: IEntry) => entry.archived_at !== undefined
    : (entry: IEntry) => entry.archived_at === undefined
  const filteredEntries = arrayIsValid(entries) ? entries.filter(eFilter) : []

  // TODO: see if its possible to use memo here somehow
  // useMemo(() => {
  //   if (arrayIsValid(entries)) {
  //     if (showArchived) {
  //       return entries.filter(entry => entry.archived_at !== undefined)
  //     } else return entries.filter(entry => entry.archived_at === undefined)
  //   } else return []
  // }, [entries, showArchived])

  const { dispatch } = useContext(Store)
  const updateEntryText = (entry: IEntry, text: string) =>
    actionUpdateEntry({ entry, text: text }, dispatch)

  return (
    <Fragment>
      <DayTitle>{day.title}</DayTitle>
      {filteredEntries.map(entry => (
        <Entry
          key={`entry-${entry.id}`}
          entry={entry}
          isArchived={entry.archived_at !== undefined}
          updateEntryText={updateEntryText}
          {...props}
        />
      ))}
    </Fragment>
  )
}
export default Day
