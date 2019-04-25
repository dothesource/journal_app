import React, { useReducer, createContext } from 'react'
import { days_reducer, archived_reducer } from './reducers'
import { drawer_reducer } from './reducers/drawer'

export const Store = createContext()

const initialState = {
  days: [],
  archived: [],
  daysLoading: true,
  daysError: false,
  drawerOpen: false
}

const reducer = (state = initialState, action) => {
  state = days_reducer(state, action)
  state = archived_reducer(state, action)
  state = drawer_reducer(state, action)
  return state
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
