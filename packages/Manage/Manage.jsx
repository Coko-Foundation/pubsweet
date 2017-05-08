import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'app/components/Navigation/Navigation.jsx'

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
  currentUser: PropTypes.object,
  children: PropTypes.node,
  actions: PropTypes.object.isRequired
}

export default Manage
