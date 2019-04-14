import createAsyncAction from '../../utils/createAsyncAction'
import { updateDay, updateEntry } from './shared'

const {
  init_action: archived_days_init,
  success_action: archived_days_success,
  failure_action: archived_days_failure,
  init: archivedInitDays,
  success: archivedDaysSuccess,
  failure: archivedDaysFailure
} = createAsyncAction('archivedDays')

export { archivedInitDays, archivedDaysSuccess, archivedDaysFailure }

const {
  init_action: delete_init,
  success_action: delete_success,
  failure_action: delete_failure,
  init: initDelete,
  success: deleteSuccess,
  failure: deleteFailure
} = createAsyncAction('deleteEntry')

export { initDelete, deleteSuccess, deleteFailure }

const {
  init_action: update_archived_init,
  success_action: update_archived_success,
  failure_action: update_archived_failure,
  init: initUpdateArchived,
  success: updateArchivedSuccess,
  failure: updateArchivedFailure
} = createAsyncAction('updateArchivedEntry')
export { initUpdateArchived, updateArchivedSuccess, updateArchivedFailure }

const {
  init_action: un_archive_init,
  success_action: un_archive_success,
  failure_action: un_archive_failure,
  init: initUnArchive,
  success: unArchiveSuccess,
  failure: unArchiveFailure
} = createAsyncAction('unArchiveEntry')

export { initUnArchive, unArchiveSuccess, unArchiveFailure }

export function archived_reducer(state, action) {
  switch (action.type) {
    case archived_days_init:
      return {
        ...state
      }
    case archived_days_success:
      return {
        ...state,
        archived: action.payload
      }
    case archived_days_failure:
      return {
        ...state
      }
    case delete_init:
      return {
        ...state
      }
    case delete_success:
      return {
        ...state,
        archived: updateDay(action.payload, state.archived)
      }
    case delete_failure:
      return {
        ...state
      }
    case update_archived_init:
      return state
    case update_archived_success:
      return {
        ...state,
        archived: updateEntry(action.payload, state.archived)
      }
    case update_archived_failure:
      return state
    case un_archive_init:
      return state
    case un_archive_success:
      return { ...state, archived: updateDay(action.payload, state.archived) }
    case un_archive_failure:
      return state
    default:
      return state
  }
}
