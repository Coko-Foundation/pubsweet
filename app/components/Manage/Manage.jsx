import React, { Component, PropTypes } from 'react'
import Navigation from 'PubSweet-navigation'

class Manage extends Component {
  render () {
    const { children, auth, actions } = this.props
    return (
      <div>
        <div className="bootstrap">
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
