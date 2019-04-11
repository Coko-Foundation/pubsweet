import React from 'react'
import PropTypes from 'prop-types'

import './Manage.scss'

function Manage({ children, nav }) {
  return (
    <div>
      <div className="bootstrap">{nav}</div>
      {children}
    </div>
  )
}

Manage.propTypes = {
  nav: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default Manage
