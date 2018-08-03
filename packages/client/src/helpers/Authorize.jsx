import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withAuthsome from './withAuthsome'
import { selectCurrentUser } from '../selectors'

export class Authorize extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authorized: undefined,
    }
  }

  componentWillMount() {
    this.checkAuth(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps)
  }

  async checkAuth({ authsome, currentUser, operation, object }) {
    try {
      const authorized = await authsome.can(
        currentUser && currentUser.id,
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

  renderUnauthorizedProp() {
    return React.isValidElement(this.props.unauthorized) ||
      this.props.unauthorized === null
      ? this.props.unauthorized
      : this.props.unauthorized()
  }

  render() {
    if (this.state.authorized === undefined) return null

    return this.state.authorized === true
      ? this.props.children
      : this.renderUnauthorizedProp()
  }
}

Authorize.propTypes = {
  currentUser: PropTypes.object,
  operation: PropTypes.string,
  object: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.element,
  unauthorized: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  authsome: PropTypes.object.isRequired,
}

Authorize.defaultProps = {
  unauthorized: null,
}

function mapState(state) {
  return {
    currentUser: selectCurrentUser(state),
  }
}

export default compose(withAuthsome(), connect(mapState))(Authorize)
