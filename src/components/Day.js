import React, { Fragment } from 'react'
import Entry from './Entry.tsx'
import styled from 'styled-components'
const DayTitle = styled.h5`
  user-select: none;
`

const Day = ({ day, ...props }) => {
  return (
    <Fragment>
      <DayTitle>{day.title}</DayTitle>
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
