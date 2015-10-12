import React from 'react'
import createHistory from 'history/lib/createBrowserHistory'
import { Router } from 'react-router'
import routes from './routes.jsx'
const history = createHistory()

/*
 * Client side bootstrap with iso and alt
 */

React.render(<Router history={history} children={routes} />, document.getElementById('app'))

