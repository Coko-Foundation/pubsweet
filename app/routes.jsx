import React from 'react'
import { Route } from 'react-router'

// Admin
import Admin from './containers/Admin'
import About from './components/Admin/About'
import BlogManager from './containers/BlogManager'
import Editor from './components/Admin/SubstanceEditor'

// Public
import BlogRoll from './containers/BlogRoll'

export default (
  <Route>
    <Route path='/' component={BlogRoll}/>
    <Route path='/admin' component={Admin}>
      <Route path='manager' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='about' component={About} />
    </Route>
  </Route>
)
