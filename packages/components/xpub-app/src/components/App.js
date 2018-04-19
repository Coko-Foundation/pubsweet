import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { AppBar } from '@pubsweet/ui'
import { withJournal } from 'xpub-journal'
import actions from 'pubsweet-client/src/actions'

const App = ({
  children,
  currentUser,
  journal,
  logoutUser,
  navLinksPerComponent,
  ...routerPath
}) => (
  <div>
    <AppBar
      brand={journal.metadata.name}
      navLinkComponents={navLinksPerComponent(routerPath)}
      onLogoutClick={logoutUser}
      user={currentUser}
    />
    <div>{children}</div>
  </div>
)

export default compose(
  connect(
    state => ({
      currentUser: state.currentUser.user,
    }),
    { logoutUser: actions.logoutUser },
  ),
  withJournal,
  withRouter,
)(App)
