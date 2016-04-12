import React from 'react'
import { Route } from 'react-router'

import { requireAuthentication } from './containers/AuthenticatedComponent'

// Manage
import Manage from './containers/Manage'
import Debug from './components/Debug'
import PostsManager from './containers/PostsManager'
import Editor from './containers/EditorWrapper'
import UsersManager from './containers/UsersManager'

// Public
import Blog from './containers/Blog'
import Blogpost from './containers/BlogpostWrapper'

// Authentication
import Login from './components/Login'
import Signup from './components/Signup'

export default (
  <Route>
    <Route path='/' component={Blog}/>

    <Route path='/manage' component={requireAuthentication(Manage)}>
      <Route path='posts' component={PostsManager} />
      <Route path='editor/:id' component={Editor} />
      <Route path='users' component={UsersManager} />
      <Route path='debug' component={Debug} />
    </Route>

    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/:id' component={Blogpost}/>
  </Route>
)
