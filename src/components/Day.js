import React, { Fragment } from 'react'
import Entry from './Entry'
const Day = ({ day, ...props }) => {
  return (
    <Fragment>
      <h5>{day.title}</h5>
      {day &&
        day.entries &&
        day.entries.map(entry => (
          <Entry
            key={`entry-${entry.id}`}
            entry={entry}
            isArchived={entry.archived_at}
            {...props}
          />
        ))}
    </Fragment>
  )
}
export default Day
