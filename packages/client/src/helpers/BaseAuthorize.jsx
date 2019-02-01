import React from 'react'
import PropTypes from 'prop-types'

export default class BaseAuthorize extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authorized: undefined,
    }
  }

  componentDidMount() {
    this.checkAuth(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.authsome !== this.props.authsome ||
      prevProps.currentUser !== this.props.currentUser ||
      prevProps.object !== this.props.object
    ) {
      this.checkAuth(this.props)
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

BaseAuthorize.propTypes = {
  currentUser: PropTypes.object,
  operation: PropTypes.string,
  object: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.element,
  unauthorized: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  authsome: PropTypes.object.isRequired,
}

BaseAuthorize.defaultProps = {
  unauthorized: null,
}
