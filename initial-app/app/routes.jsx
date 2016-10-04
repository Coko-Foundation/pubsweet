import React from 'react'
import { Route } from 'react-router'

import { requireAuthentication } from 'pubsweet-frontend/src/components/AuthenticatedComponent'

// Manage
import Manage from 'pubsweet-component-manage/Manage'
import PostsManager from 'pubsweet-component-posts-manager/PostsManager'
import ScienceWriter from 'pubsweet-component-science-writer/ScienceWriter'
import UsersManager from 'pubsweet-component-users-manager/UsersManager'
import TeamsManager from 'pubsweet-component-teams-manager/TeamsManager'

// Public
import Blog from 'pubsweet-component-blog/Blog'
import ScienceReader from 'pubsweet-component-science-reader/ScienceReader'

// Authentication
import Login from 'pubsweet-component-login/Login'
import Signup from 'pubsweet-component-signup/Signup'

const AuthenticatedManage = requireAuthentication(
  Manage, 'create', (state) => state.collections[0]
)

export default (
  <Route>
    <Route path='/' component={Blog} />

    <Route path='/manage' component={AuthenticatedManage}>
      <Route path='posts' component={PostsManager} />
      <Route path='sciencewriter/:id' component={ScienceWriter} />
      <Route path='users' component={UsersManager} />
      <Route path='teams' component={TeamsManager} />
    </Route>

    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/:id' component={ScienceReader} />
  </Route>
)
