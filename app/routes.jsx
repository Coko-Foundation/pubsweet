import React from 'react'
import { Route } from 'react-router'

import { requireAuthentication } from './containers/AuthenticatedComponent'

// Admin
import Admin from './containers/Admin'
import Debug from './components/Admin/Debug'

import BlogManager from './containers/Admin/BlogManager'
import Editor from './containers/Admin/EditorWrapper'
import UsersManager from './containers/Admin/UsersManager'

// Contributor
import Contributor from './containers/Contributor'

// Public
import Blog from './containers/Blog'
import Blogpost from './containers/BlogpostWrapper'

import Login from './components/Login'
import Signup from './components/Signup'

export default (
  <Route>
    <Route path='/' component={Blog}/>

    <Route path='/admin' component={requireAuthentication(Admin)}>
      <Route path='posts' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='users' component={UsersManager} />
      <Route path='debug' component={Debug} />
    </Route>

    <Route path='/contributor' component={requireAuthentication(Contributor)}>
      <Route path='posts' component={BlogManager} />
      <Route path='editor/:id' component={Editor} />
    </Route>

    <Route path='login' component={Login} />
    <Route path='signup' component={Signup} />
    <Route path='/:id' component={Blogpost}/>
  </Route>
)
