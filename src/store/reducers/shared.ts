/* eslint-disable @typescript-eslint/camelcase */
import { arrayIsValid, uuidv4, last } from '../../utils/generic'
import moment from 'moment'
import { IEntry } from '../../interfaces/IEntry'
import { IDay } from '../../interfaces/IDay'

export function updateDay(day, days) {
  const daysForUpdate = [...days]
  if (!!day.entries && day.entries.length === 0) {
    return daysForUpdate.filter(dayForUpdate => dayForUpdate.id !== day.id)
  }
  const index = daysForUpdate.findIndex(d => d.id === day.id)
  if (index !== -1) {
    daysForUpdate[index] = day
  } else {
    daysForUpdate.push(day)
  }
  return daysForUpdate
}

export function updateEntry(
  { entry: newEntry, text }: { entry: IEntry; text: string },
  days: IDay[]
) {
  if (!arrayIsValid(days)) throw Error('no days present')
  const daysForUpdate = [...days]
  const dayToUpdate = daysForUpdate.find(d => d.id === newEntry.day_id)
  if (dayToUpdate) {
    const entryToUpdate = dayToUpdate.entries.find(e => e.id === newEntry.id)
    if (entryToUpdate) entryToUpdate.text = text
    else throw new Error('entry not found')
  }
  return daysForUpdate
}

function createDay(partialDay: Partial<IDay>) {
  const newDate = {
    id: uuidv4(),
    entries: [],
    datetime: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    title: moment().format('DD/MM/YYYY')
  }

  return { ...newDate, ...partialDay }
}

export function addEntry(entryText: string, days: IDay[]) {
  let daysForUpdate: IDay[]
  const entry = {
    id: uuidv4(),
    text: entryText,
    day_id: '',
    datetime: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    archived_at: undefined
  }
  console.log(days)
  if (!arrayIsValid(days)) {
    console.log('im here')
    const newDayId = uuidv4()
    daysForUpdate = [
      {
        id: newDayId,
        entries: [{ ...entry, day_id: newDayId }],
        datetime: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        title: moment().format('DD/MM/YYYY')
      }
    ]
  } else {
    daysForUpdate = [...days]
    const mostRecentDay = last(daysForUpdate) as IDay
    let dayToUpdate
    if (
      mostRecentDay &&
      moment().isSame(moment(mostRecentDay.datetime), 'day')
    ) {
      dayToUpdate = mostRecentDay
    } else {
      dayToUpdate = createDay({})
    }
    // const dayToUpdate = daysForUpdate.find(d => d.id === entry.day_id)
    if (dayToUpdate) {
      dayToUpdate.entries.push({ ...entry, day_id: dayToUpdate.id })
    } else {
      throw Error('day not found')
    }
  }
  console.log(daysForUpdate)
  return daysForUpdate
}
