import { Router } from '@reach/router'
import React from 'react'
import Archived from './modules/Archived'
import Days from './modules/Days'
import { StoreProvider } from './store'
import DrawerNav from './components/DrawerNav'

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Days path="/" />
        <Archived path="/archived" />
      </Router>
      <DrawerNav />
    </StoreProvider>
  )
}

export default App
