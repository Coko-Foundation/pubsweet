import React from 'react'
const config = require('config')
import Navigation from config.get('pubsweet-frontend.navigation')

class Manage extends React.Component {
  render () {
    const { children, currentUser, actions } = this.props
    return (
      <div>
        <div className="bootstrap">
          <Navigation
            currentUser={currentUser}
            actions={actions}
            />
        </div>
        {children}
      </div>
    )
  }
}

Manage.propTypes = {
  currentUser: React.PropTypes.object,
  children: React.PropTypes.node,
  actions: React.PropTypes.object.isRequired
}

export default Manage
