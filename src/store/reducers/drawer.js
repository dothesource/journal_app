export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export function drawer_reducer(state, action) {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, drawerOpen: true }
    case CLOSE_DRAWER:
      return { ...state, drawerOpen: false }
    case TOGGLE_DRAWER:
      return { ...state, drawerOpen: !state.drawerOpen }
    default:
      return state
  }
}
