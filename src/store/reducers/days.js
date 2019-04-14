import createAsyncAction from '../../utils/createAsyncAction'
import { updateDay, updateEntry } from './shared'

const {
  init_action: days_init,
  success_action: days_success,
  failure_action: days_failure,
  init: initDays,
  success: daysSuccess,
  failure: daysFailure
} = createAsyncAction('days')

export { initDays, daysSuccess, daysFailure }

const {
  init_action: archive_init,
  success_action: archive_success,
  failure_action: archive_failure,
  init: initArchive,
  success: archiveSuccess,
  failure: archiveFailure
} = createAsyncAction('archiveEntry')

export { initArchive, archiveSuccess, archiveFailure }

const {
  init_action: save_init,
  success_action: save_success,
  failure_action: save_failure,
  init: initSave,
  success: saveSuccess,
  failure: saveFailure
} = createAsyncAction('saveEntry')
export { initSave, saveSuccess, saveFailure }

const {
  init_action: update_init,
  success_action: update_success,
  failure_action: update_failure,
  init: initUpdate,
  success: updateSuccess,
  failure: updateFailure
} = createAsyncAction('updateEntry')
export { initUpdate, updateSuccess, updateFailure }

export function days_reducer(state, action) {
  switch (action.type) {
    case days_init:
      return {
        ...state,
        daysLoading: true,
        daysError: false
      }
    case days_success:
      return {
        ...state,
        daysLoading: false,
        daysError: false,
        days: action.payload
      }
    case days_failure:
      return {
        ...state,
        daysLoading: false,
        daysError: true
      }
    case archive_init:
      return {
        ...state
      }
    case archive_success:
      return {
        ...state,
        days: updateDay(action.payload, state.days)
      }
    case archive_failure:
      return {
        ...state
      }
    case save_init:
      return state
    case save_success:
      return {
        ...state,
        days: updateDay(action.payload, state.days)
      }
    case save_failure:
      return state
    case update_init:
      return state
    case update_success:
      return {
        ...state,
        days: updateEntry(action.payload, state.days)
      }
    case update_failure:
      return state
    default:
      return state
  }
}
