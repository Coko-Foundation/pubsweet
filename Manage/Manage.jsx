import React from 'react'
import Navigation from 'pubsweet-component-navigation/Navigation'

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
