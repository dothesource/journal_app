import React, { Fragment } from 'react'
import Entry from './Entry'
const Day = ({
  day,
  deleteEntry,
  updateEntryText,
  archiveEntry,
  unarchiveEntry
}) => {
  return (
    <Fragment>
      <h5>{day.title}</h5>
      {day &&
        day.entries &&
        day.entries.map(entry => (
          <Entry
            key={`entry-${entry.id}`}
            entry={entry}
            deleteEntry={deleteEntry}
            updateEntryText={updateEntryText}
            archiveEntry={archiveEntry}
            unarchiveEntry={unarchiveEntry}
            isArchived={entry.archived_at}
          />
        ))}
    </Fragment>
  )
}
export default Day
