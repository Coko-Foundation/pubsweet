import React from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/react-components'

import { ErrorText } from '@pubsweet/ui'
import { Redirect, withRouter } from 'react-router-dom'
import { CURRENT_USER } from '../helpers/AuthorizeGraphQLQueries'
import Loading from './Loading'

const AuthenticatedComponent = ({ children, location }) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />
      if (error) return <ErrorText>{error}</ErrorText>

      if (!localStorage.getItem('token') || !data.currentUser) {
        const { pathname, search = '' } = location
        const url = pathname + search
        return <Redirect to={`/login?next=${url}`} />
      }

      return children
    }}
  </Query>
)

AuthenticatedComponent.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(AuthenticatedComponent)
