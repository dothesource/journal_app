import React from 'react'
import { days_reducer, archived_reducer } from './stores'

export const Store = React.createContext()

const initialState = {
  days: [],
  archived: [],
  daysLoading: true,
  daysError: false
}

const reducer = (state = initialState, action) => {
  state = days_reducer(state, action)
  return archived_reducer(state, action)
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
