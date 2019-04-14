import React, { useReducer, createContext } from 'react'
import { days_reducer, archived_reducer } from './reducers'

export const Store = createContext()

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
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
