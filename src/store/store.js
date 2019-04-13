import React from 'react'
// import combineReducers from '../utils/combineReducers'
// import * as reducers from './stores'
import { days_reducer as reducer } from './stores'

export const Store = React.createContext()

const initialState = {
  days: [],
  archived: [],
  daysLoading: true,
  daysError: false
}
// const reducer = combineReducers(reducers)

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
