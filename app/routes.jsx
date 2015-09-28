import React from 'react'
import Route from 'react-router'

import App from 'components/App'
import About from 'components/About'
import Dashboard from 'components/Dashboard'
import Manage from 'components/Manage'
import Create from 'components/Create'

export default (
  <Route path='/admin' component={App}>
    <Route path='manages' component={Manage} />
    <Route path='creates/:createId' component={Create}/>
    <Route path='dashboard' component={Dashboard} />
    <Route path='about' component={About} />
  </Route>
)
