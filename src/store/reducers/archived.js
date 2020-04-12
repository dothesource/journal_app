import { createActionFunction } from '../../utils/createActions'

// import createAsyncAction from '../../utils/createAsyncAction'
// import { updateDay, updateEntry } from './shared'

// export const archivedDaysActions = createAsyncAction('archivedDays')

// export const deleteActions = createAsyncAction('deleteEntry')

// export const updateArchivedActions = createAsyncAction('updateArchivedEntry')

// export const unArchiveActions = createAsyncAction('unArchiveEntry')

// const ARCHIVE_ENTRY = 'ARCHIVE_ENTRY'
// export const actionArchiveEntry = createActionFunction(ARCHIVE_ENTRY)

// function archiveEntry(entry, archived, days) {}

// export function archived_reducer(state, action) {
//   switch (action.type) {
//     case ARCHIVE_ENTRY:
//       return {
//         ...state,
//         archived: archiveEntry(action.payload, state.archived)
//         days:
//       }
//   }
// }

// export function archived_reducer(state, action) {
//   switch (action.type) {
//     case archivedDaysActions.init_action:
//       return {
//         ...state
//       }
//     case archivedDaysActions.success_action:
//       return {
//         ...state,
//         archived: action.payload
//       }
//     case archivedDaysActions.failure_action:
//       return {
//         ...state
//       }
//     case deleteActions.init_action:
//       return {
//         ...state
//       }
//     case deleteActions.success_action:
//       return {
//         ...state,
//         archived: updateDay(action.payload, state.archived)
//       }
//     case deleteActions.failure_action:
//       return {
//         ...state
//       }
//     case updateArchivedActions.init_action:
//       return state
//     case updateArchivedActions.success_action:
//       return {
//         ...state,
//         archived: updateEntry(action.payload, state.archived)
//       }
//     case updateArchivedActions.failure_action:
//       return state
//     case unArchiveActions.init_action:
//       return state
//     case unArchiveActions.success_action:
//       return { ...state, archived: updateDay(action.payload, state.archived) }
//     case unArchiveActions.failure_action:
//       return state
//     default:
//       return state
//   }
// }
