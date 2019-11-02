import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'

import AppBar from '../../components/AppBar'
// import api from '../../utils/api'
import { IDay } from '../../interfaces/IDay'
import Entry from '../../components/Entry'
const Day = ({ dayId }: { dayId: string }) => {
  const [day, setDay] = useState<IDay | null>(null)
  useEffect(() => {
    //   api.getDay(dayId).then(result => {
    //     setDay(result)
    //   })
  }, [dayId])
  return (
    <div>
      <AppBar title={day && day.title} />
      <Container>
        {!!day &&
          !!day.entries &&
          day.entries.length > 0 &&
          day.entries.map(e => <Entry entry={e} key={e.id} noActions />)}
      </Container>
    </div>
  )
}
export default Day
