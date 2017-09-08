import React from 'react'
import PropTypes from 'prop-types'
import Navigation from 'app/components/Navigation/Navigation'

function Manage ({ children, currentUser, actions, nav }) {
  return (
      <div>
        <div className="bootstrap">
          {
            nav || <Navigation currentUser={currentUser} actions={actions}/>
          }
        </div>
        {children}
      </div>
  )
}

Manage.propTypes = {
  nav: PropTypes.node,
  children: PropTypes.node,
  currentUser: PropTypes.object,
  actions: PropTypes.object
}

export default Manage
