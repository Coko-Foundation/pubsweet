import React from 'react'
import { Route } from 'react-router'

import App from './containers/App'

// Admin
import About from './components/About'
import BlogManager from './containers/BlogManager'
import Editor from './components/SubstanceEditor'

// Public
import Share from './components/Share'

export default (
  <Route component={App}>
    <Route path='/' component={Share}/>
    <Route path='/admin'>
      <Route path='manager' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='about' component={About} />
    </Route>
  </Route>
)
