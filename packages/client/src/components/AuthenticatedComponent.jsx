import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import gql from 'graphql-tag'

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

export class AuthenticatedComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  checkAuth({ data: { loading, currentUser } }) {
    if (!loading && !(currentUser && currentUser.user)) {
      const redirectAfterLogin = this.props.location.pathname
      this.props.history.push(`/login?next=${redirectAfterLogin}`)
    }
  }

  render() {
    const { data, children } = this.props
    return data.currentUser && data.currentUser.user ? children : null
  }
}

AuthenticatedComponent.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    currentUser: PropTypes.object,
  }),
  children: PropTypes.node,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  history: PropTypes.shape({ push: PropTypes.func }),
}

export default compose(withRouter, graphql(query))(AuthenticatedComponent)
