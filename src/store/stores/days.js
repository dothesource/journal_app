import createAsyncAction from '../../utils/createAsyncAction'

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

function updateDay(day, days) {
  let days_for_update = [...days]
  if (!!day.entries && day.entries.length === 0) {
    return days_for_update.filter(day_i => day_i.id !== day.id)
  }
  const index = days_for_update.findIndex(d => d.id === day.id)
  if (index !== -1) {
    days_for_update[index] = day
  } else {
    days_for_update.push(day)
  }
  return days_for_update
}
function updateEntry({ entry: new_entry, text }, days) {
  const days_for_update = [...days]
  const day_to_update = days_for_update.find(d => d.id === new_entry.day_id)
  const entry_to_update = day_to_update.entries.find(e => e.id === new_entry.id)
  entry_to_update.text = text
  return days_for_update
}

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
