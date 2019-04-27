import { Router } from '@reach/router'
import React from 'react'
import DrawerNav from './components/DrawerNav'
import Archived from './modules/Archived'
import Day from './modules/Day'
import Days from './modules/Days'
import Search from './modules/Search'
import { StoreProvider } from './store'

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Days path="/" />
        <Archived path="/archived" />
        <Search path="/search" />
        <Day path="/day/:dayId" />
      </Router>
      <DrawerNav />
    </StoreProvider>
  )
}

export default App
