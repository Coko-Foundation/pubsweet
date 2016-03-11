import React, { Component, PropTypes } from 'react'
import Navigation from '../components/Contributor/Navigation'
import '../scss/main'

class Contributor extends Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    const { children, auth, actions } = this.props
    return (
      <div>
        <div className='bootstrap'>
          <Navigation
            auth={auth}
            actions={actions}
            />
        </div>
        {children}
      </div>
    )
  }
}

Contributor.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

export default Contributor
