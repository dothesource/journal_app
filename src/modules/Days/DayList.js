import React, { Fragment } from 'react'
import Day from '../../components/Day'
const DayList = ({ days, ...props }) => {
  return (
    <Fragment>
      {days.map(day => (
        <Day key={`day-${day.id}`} day={day} {...props} />
      ))}
    </Fragment>
  )
}
export default DayList
