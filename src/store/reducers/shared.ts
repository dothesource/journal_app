/* eslint-disable @typescript-eslint/camelcase */
import { arrayIsValid, uuidv4, last } from '../../utils/generic'
import moment from 'moment'
import { IEntry } from '../../interfaces/IEntry'
import { IDay } from '../../interfaces/IDay'
import { db } from '../../model/database'

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
    if (entryToUpdate) {
      entryToUpdate.text = text
      db.table("days").update(dayToUpdate.id, { entries: dayToUpdate.entries })
    }
    else throw new Error('entry not found')
  } else throw new Error('day not found')
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
  if (!arrayIsValid(days)) {
    const newDayId = uuidv4()
    const newDay = {
      id: newDayId,
      entries: [{ ...entry, day_id: newDayId }],
      datetime: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      title: moment().format('DD/MM/YYYY')
    }
    daysForUpdate = [
      newDay
    ]
    db.table('days')
      .add(newDay)
      .then((day) => console.log(day))
  } else {
    daysForUpdate = [...days]
    const mostRecentDay = last(daysForUpdate) as IDay
    let dayToUpdate
    if (
      mostRecentDay &&
      moment().isSame(moment(mostRecentDay.datetime), 'day')
    ) {
      dayToUpdate = mostRecentDay
      dayToUpdate.entries.push({ ...entry, day_id: dayToUpdate.id })
      db.table("days").update(dayToUpdate.id, { entries: dayToUpdate.entries })
    } else {
      dayToUpdate = createDay({})
      db.table('days')
        .add(dayToUpdate)
        .then((day) => console.log(day))
    }
    // const dayToUpdate = daysForUpdate.find(d => d.id === entry.day_id)
    // if (dayToUpdate) {
    // dayToUpdate.entries.push({ ...entry, day_id: dayToUpdate.id })
    // db.table("days").update(dayToUpdate.id, { entries: dayToUpdate.entries })
    // } else {
    //   throw Error('day not found')
    // }
  }
  return daysForUpdate
}
