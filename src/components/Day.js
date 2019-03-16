import React from 'react'
import Entry from './Entry'
const Day = ({ day, deleteEntry }) => {
  return (
    <React.Fragment>
      <h5>{day.title}</h5>
      {day &&
        day.entries &&
        day.entries.map(entry => (
          <Entry key={entry.id} entry={entry} deleteEntry={deleteEntry} />
        ))}
    </React.Fragment>
  )
}
export default Day
