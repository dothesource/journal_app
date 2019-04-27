import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Entry from '../../components/Entry'
import AppBar from '../../components/AppBar'
import api from '../../utils/api'
const Day = ({ dayId }) => {
  const [day, setDay] = useState({ id: dayId, title: '' })
  useEffect(() => {
    api.getDay(dayId).then(result => {
      setDay(result)
    })
  }, [dayId])
  return (
    <div>
      <AppBar title={day.title} />
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
