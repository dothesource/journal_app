import { createActionFunction } from '../../utils/createActions'
import { updateEntry, addEntry } from './shared.ts'

const ADD_ENTRY = 'ADD_ENTRY'
export const actionAddEntry = createActionFunction(ADD_ENTRY)

const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const actionUpdateEntry = createActionFunction(UPDATE_ENTRY)

export function days_reducer(state, action) {
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
    default:
      return state
  }
}
