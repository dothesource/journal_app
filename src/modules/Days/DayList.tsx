import React, { Fragment } from 'react'
import Day from '../../components/Day'
import { arrayIsValid } from '../../utils/generic'
import { IDay } from '../../interfaces/IDay'

const DayList = ({
  days,
  showArchived = false,
  ...props
}: {
  days: IDay[]
  showArchived?: boolean
  [key: string]: any
}) => {
  return (
    <Fragment>
      {arrayIsValid(days) &&
        days
          .filter(
            day =>
              arrayIsValid(day.entries) &&
              arrayIsValid(day.entries.filter(e => !e.archived_at))
          )
          .map(day => <Day key={`day-${day.id}`} day={day} {...props} />)}
    </Fragment>
  )
}
export default DayList
