import { createActionFunction } from '../../utils/createActions'
import { updateEntry, addEntry } from './shared'
import { IEntry } from '../../interfaces/IEntry'
import { IDay } from '../../interfaces/IDay'

const ADD_ENTRY = 'ADD_ENTRY'
export const actionAddEntry = createActionFunction(ADD_ENTRY)

const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const actionUpdateEntry = createActionFunction(UPDATE_ENTRY)

const ARCHIVE_ENTRY = 'ARCHIVE_ENTRY'
export const actionArchiveEntry = createActionFunction(ARCHIVE_ENTRY)

function archiveEntry(entry: IEntry, days: IDay[]) {
  const days_for_update = [...days]
  const day_for_update = days_for_update.find(day => day.id === entry.day_id)
  if (day_for_update) {
    const entry_for_update = day_for_update.entries.find(e => e.id === entry.id)
    if (entry_for_update) entry_for_update.archived_at = new Date()
    else throw new Error(`archive entry - entry with id ${entry.id} not found`)
  } else {
    throw new Error(`archive entry - day with id ${entry.day_id} not found `)
  }
  return days_for_update
}

export function days_reducer(state: any, action: any) {
  switch (action.type) {
    case ADD_ENTRY:
      return {
        ...state,
        days: addEntry(action.payload, state.days)
      }
    case UPDATE_ENTRY:
      return {
        ...state,
        days: updateEntry(action.payload, state.days)
      }
    case ARCHIVE_ENTRY:
      return {
        ...state,
        days: archiveEntry(action.payload, state.days)
      }
    default:
      return state
  }
}
