import React from 'react'
import Route from 'react-router'

import App from 'components/App'
import About from 'components/About'
import Dashboard from 'components/Dashboard'
import Manage from 'components/Manage'

// import ManageStore from 'stores/ManageStore'

export default (
  <Route path='/admin' component={App}>
    <Route path='manage' component={Manage} />
    <Route path='dashboard' component={Dashboard} />
    <Route path='about' component={About} />
  </Route>
)
