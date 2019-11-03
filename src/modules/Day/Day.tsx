import React, {
  useEffect,
  useState,
  FunctionComponent,
  useContext
} from 'react'
import Container from '../../components/Container'

import AppBar from '../../components/AppBar'
// import api from '../../utils/api'
import { IDay } from '../../interfaces/IDay'
import Entry from '../../components/Entry'
import { actionUpdateEntry } from '../../store/reducers/days'
import { IEntry } from '../../interfaces/IEntry'
import { Store } from '../../store'

type Props = {
  dayId?: string
  path: string
}

const Day: FunctionComponent<Props> = ({ dayId }: Props) => {
  const [day, setDay] = useState<IDay | null>(null)
  const { dispatch } = useContext(Store)
  const updateEntryText = (entry: IEntry, text: string) =>
    actionUpdateEntry({ entry, text: text }, dispatch)
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
          day.entries.map(e => (
            <Entry
              entry={e}
              key={e.id}
              updateEntryText={updateEntryText}
              noActions
            />
          ))}
      </Container>
    </div>
  )
}
export default Day
