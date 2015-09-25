import React from 'react'
import Route from 'react-router'

import App from 'components/App'
import About from 'components/About'
import Dashboard from 'components/Dashboard'
import Manage from 'components/Manage'

export default (
  <Route path='/admin' component={App}>
    <Route path='manages' component={Manage} />
    <Route path='manages/:manage_id/creates/:create_id' component={Create}>
    <Route path='dashboard' component={Dashboard} />
    <Route path='about' component={About} />
  </Route>
)
