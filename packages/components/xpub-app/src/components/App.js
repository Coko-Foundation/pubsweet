import React from 'react'
import { connect } from 'react-redux'
import { compose, graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { AppBar } from '@pubsweet/ui'
import { withJournal } from 'xpub-journal'
import actions from 'pubsweet-client/src/actions'

const App = ({ children, currentUser, journal, logoutUser }) => (
  <div>
    <AppBar
      brand={journal.metadata.name}
      onLogoutClick={logoutUser}
      user={currentUser}
    />

    <div>{children}</div>
  </div>
)

const query = gql`
  query CurrentUser {
    currentUser {
      user {
        id
        username
        email
        admin
      }
    }
  }
`

export default compose(
  graphql(query, {
    props: ({ data: { currentUser } }) => ({
      currentUser: currentUser && currentUser.user,
    }),
  }),
  connect(null, { logoutUser: actions.logoutUser }),
  withJournal,
)(App)
