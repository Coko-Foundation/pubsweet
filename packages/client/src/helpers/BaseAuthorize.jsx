import React from 'react'
import PropTypes from 'prop-types'

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
