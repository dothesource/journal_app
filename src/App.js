import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Days from './modules/Days'
import Archived from './modules/Archived'


const App = () => {
  // <Link to="/">Days/Home</Link>
  // <Link to="/archived">Archived</Link>
  return (
    <Router>
      <Route path="/" exact component={Days} />
      <Route path="/archived" component={Archived} />
    </Router>
  )
}

export default App
