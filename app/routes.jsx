import React from 'react'
import { Route } from 'react-router'

import { requireAuthentication } from './components/AuthenticatedComponent'

// Manage
import Manage from './components/Manage'
import PostsManager from './components/PostsManager/PostsManager'
import ScienceWriter from './components/ScienceWriter/ScienceWriter'
import UsersManager from './components/UsersManager/UsersManager'

// Public
import Blog from './components/Blog/Blog'
import ScienceReader from './components/ScienceReader/ScienceReader'

// Authentication
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

export default (
  <Route>
    <Route path='/' component={Blog}/>

    <Route path='/manage' component={requireAuthentication(Manage)}>
      <Route path='posts' component={PostsManager} />
      <Route path='sciencewriter/:id' component={ScienceWriter} />
      <Route path='users' component={UsersManager} />
    </Route>

    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/:id' component={ScienceReader}/>
  </Route>
)
