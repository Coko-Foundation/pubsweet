import React from 'react'
import { Route } from 'react-router'

import { requireAuthentication } from 'pubsweet-components/AuthenticatedComponent'

// Manage
import Manage from 'pubsweet-components/Manage/Manage'
import PostsManager from 'pubsweet-components/PostsManager/PostsManager'
import ScienceWriter from 'pubsweet-components/ScienceWriter/ScienceWriter'
import UsersManager from 'pubsweet-components/UsersManager/UsersManager'
import TeamsManager from 'pubsweet-components/TeamsManager/TeamsManager'

// Public
import Blog from 'pubsweet-components/Blog/Blog'
import ScienceReader from 'pubsweet-components/ScienceReader/ScienceReader'

// Authentication
import Login from 'pubsweet-components/Login/Login'
import Signup from 'pubsweet-components/Signup/Signup'

export default (
  <Route>
    <Route path='/' component={Blog} />

    <Route path='/manage' component={requireAuthentication(Manage, 'create', (state) => state.collections[0])}>
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
