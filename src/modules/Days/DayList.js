import React, { Fragment } from 'react'
import Day from '../../components/Day'
import { arrayIsValid } from '../../utils/generic'

const DayList = ({ days, ...props }) => {
  return (
    <Fragment>
      {arrayIsValid(days) &&
        days.map(day => <Day key={`day-${day.id}`} day={day} {...props} />)}
    </Fragment>
  )
}
export default DayList
