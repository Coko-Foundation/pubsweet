import React, { Component, PropTypes } from 'react'
import Navigation from '../components/Admin/Navigation'

import '../scss/main'

class Admin extends Component {
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

Admin.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node,
  actions: React.PropTypes.object.isRequired
}

export default Admin
