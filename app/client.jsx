import React from 'react'
import Iso from 'iso'
import createHistory from 'history/lib/createBrowserHistory'
import { Router } from 'react-router'

import alt from './altInstance'
import routes from './routes.jsx'

const history = createHistory()

/*
 * Client side bootstrap with iso and alt
 */
Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state)
  React.render(<Router history={history} children={routes} />, container)
})
