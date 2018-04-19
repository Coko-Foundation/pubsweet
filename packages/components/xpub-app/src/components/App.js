import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { matchPath, withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'

import { AppBar, Link } from '@pubsweet/ui'
import { withJournal } from 'xpub-journal'
import actions from 'pubsweet-client/src/actions'

const App = ({ children, currentUser, journal, logoutUser, ...rest }) => (
  <div>
    <AppBar
      brand={journal.metadata.name}
      navLinkComponents={NavLinkComponents(rest)}
      onLogoutClick={logoutUser}
      user={currentUser}
    />
    <div>{children}</div>
  </div>
)

const ManuscriptMenu = (routerPath, path) => {
  const testMatch = matchPath(routerPath.history.location.pathname, path)
  return testMatch ? (
    <Link
      to={`/projects/${testMatch.params.project}/versions/${
        testMatch.params.version
      }/manuscript`}
    >
      Manuscript
    </Link>
  ) : null
}

const SubmissionMenu = (routerPath, path) => {
  const testMatch = matchPath(routerPath.history.location.pathname, path)
  return testMatch ? (
    <Link
      to={`/projects/${testMatch.params.project}/versions/${
        testMatch.params.version
      }/submit`}
    >
      Submission Info
    </Link>
  ) : null
}

// We should think put this with menu in config
// And remove that paths from their
const NavLinkComponents = routerPath =>
  [
    ManuscriptMenu(routerPath, '/projects/:project/versions/:version/submit'),
    SubmissionMenu(
      routerPath,
      '/projects/:project/versions/:version/manuscript',
    ),
  ].filter(comp => comp)

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
