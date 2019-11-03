import React, {
  // useEffect,
  // useState,
  FunctionComponent,
  useContext,
  useMemo
} from 'react'
import Container from '../../components/Container'

import AppBar from '../../components/AppBar'
// import api from '../../utils/api'
import Entry from '../../components/Entry'
import { actionUpdateEntry } from '../../store/reducers/days'
import { IEntry } from '../../interfaces/IEntry'
import { Store } from '../../store'
import { arrayIsValid } from '../../utils/generic'
import { IDay } from '../../interfaces/IDay'

type Props = {
  dayId?: string
  path: string
}

const Day: FunctionComponent<Props> = ({ dayId }: Props) => {
  // const [day, setDay] = useState<IDay | null>(null)
  const {
    state: { days },
    dispatch
  } = useContext(Store)
  const day: IDay = days.find((d: IDay) => d.id === dayId)
  const updateEntryText = (entry: IEntry, text: string) =>
    actionUpdateEntry({ entry, text: text }, dispatch)
  // useEffect(() => {

  //   api.getDay(dayId).then(result => {
  //     setDay(result)
  //   })
  // }, [day])

  const entries = day.entries
  const filteredEntries = arrayIsValid(entries)
    ? entries.filter(entry => entry.archived_at !== undefined)
    : []
  // useMemo(() => {
  //   if (arrayIsValid(entries)) {
  //     return entries.filter(entry => entry.archived_at !== undefined)
  //   } else return []
  // }, [entries])

  return (
    <div>
      <AppBar title={day && day.title} />
      <Container>
        {filteredEntries.map((entry: IEntry) => (
          <Entry
            entry={entry}
            key={entry.id}
            updateEntryText={updateEntryText}
            noActions
          />
        ))}
      </Container>
    </div>
  )
}
export default Day
