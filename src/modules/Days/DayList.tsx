import React, { Fragment } from 'react'
import Day from '../../components/Day'
import { arrayIsValid } from '../../utils/generic'
import { IDay } from '../../interfaces/IDay'

const DayList = ({ days, ...props }: { days: IDay[]; [key: string]: any }) => {
  return (
    <Fragment>
      {arrayIsValid(days) &&
        days.map(day => <Day key={`day-${day.id}`} day={day} {...props} />)}
    </Fragment>
  )
}
export default DayList
