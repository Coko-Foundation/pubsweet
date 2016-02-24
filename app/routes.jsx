import React from 'react'
import { Route } from 'react-router'

// Admin
import { requireAuthentication } from './containers/AuthenticatedComponent'
import Admin from './containers/Admin'
import About from './components/Admin/About'
import BlogManager from './containers/Admin/BlogManager'
import Editor from './containers/Admin/EditorWrapper'
import UsersManager from './containers/Admin/UsersManager'

// Public
import Blog from './containers/Blog'
import Blogpost from './containers/BlogpostWrapper'

import Login from './components/Login'
import Signup from './components/Signup'

export default (
  <Route>
    <Route path='/' component={Blog}/>
    <Route path='/admin' component={requireAuthentication(Admin)}>
      <Route path='manager' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='users' component={UsersManager} />
      <Route path='about' component={About} />
    </Route>
    <Route path='login' component={Login} />
    <Route path='signup' component={Signup} />
    <Route path='/:id' component={Blogpost}/>
  </Route>
)
