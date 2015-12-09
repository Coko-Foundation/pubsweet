import React from 'react'
import { Route } from 'react-router'

// Admin
import Admin from './containers/Admin'
import About from './components/Admin/About'
import BlogManager from './containers/Admin/BlogManager'
import Editor from './containers/Admin/EditorWrapper'

// Public
import Blog from './containers/Blog'
import Blogpost from './containers/BlogpostWrapper'

export default (
  <Route>
    <Route path='/' component={Blog}/>
    <Route path='/admin' component={Admin}>
      <Route path='manager' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='about' component={About} />
    </Route>
    <Route path='/:id' component={Blogpost}/>
  </Route>
)
