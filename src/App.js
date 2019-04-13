import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Days from './modules/Days'
import Archived from './modules/Archived'
import { StoreProvider } from './store'

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Route path="/" exact component={Days} />
        <Route path="/archived" component={Archived} />
      </Router>
    </StoreProvider>
  )
}

export default App
