import createAsyncAction from '../../utils/createAsyncAction'
import { updateDay, updateEntry } from './shared'

export const daysActions = createAsyncAction('days')

export const archiveActions = createAsyncAction('archiveEntry')

export const saveActions = createAsyncAction('saveEntry')

export const updateActions = createAsyncAction('updateEntry')

export function days_reducer(state, action) {
  switch (action.type) {
    case daysActions.init_action:
      return {
        ...state,
        daysLoading: true,
        daysError: false
      }
    case daysActions.success_action:
      return {
        ...state,
        daysLoading: false,
        daysError: false,
        days: action.payload
      }
    case daysActions.failure_action:
      return {
        ...state,
        daysLoading: false,
        daysError: true
      }
    case archiveActions.init_action:
      return {
        ...state
      }
    case archiveActions.success_action:
      return {
        ...state,
        days: updateDay(action.payload, state.days)
      }
    case archiveActions.failure_action:
      return {
        ...state
      }
    case saveActions.init_action:
      return state
    case saveActions.success_action:
      return {
        ...state,
        days: updateDay(action.payload, state.days)
      }
    case saveActions.failure_action:
      return state
    case updateActions.init_action:
      return state
    case updateActions.success_action:
      return {
        ...state,
        days: updateEntry(action.payload, state.days)
      }
    case updateActions.failure_action:
      return state
    default:
      return state
  }
}
