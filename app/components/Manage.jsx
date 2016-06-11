import React, { Component, PropTypes } from 'react'
import Navigation from 'navigation'

import '../scss/main'

class Manage extends Component {
  constructor (props) {
    super(props)
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

Manage.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node,
  actions: React.PropTypes.object.isRequired
}

export default Manage
