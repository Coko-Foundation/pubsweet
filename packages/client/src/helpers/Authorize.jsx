import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import withAuthsome from './withAuthsome'

export class Authorize extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authorized: false,
    }
  }

  componentWillMount() {
    this.checkAuth(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  async checkAuth({ authsome, data: { currentUser }, operation, object }) {
    try {
      const authorized = await authsome.can(
        currentUser && currentUser.user && currentUser.user.id,
        operation,
        object,
      )
      this.setState({
        authorized,
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return this.state.authorized
      ? this.props.children
      : this.props.unauthorized || null
  }
}

Authorize.propTypes = {
  data: PropTypes.shape({ currentUser: PropTypes.object }),
  operation: PropTypes.string,
  object: PropTypes.object,
  children: PropTypes.element,
  unauthorized: PropTypes.node,
  authsome: PropTypes.object.isRequired,
}

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

export default compose(withAuthsome(), graphql(query))(Authorize)
