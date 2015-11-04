import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import BurgerMenu from 'react-burger-menu'

import '../../scss/components/_navigation'

export default class Navigation extends React.Component {

  render () {
    const Menu = BurgerMenu['slide']
    return (
      <Menu>
        <p>Science Blogger</p>
        <LinkContainer to='/admin/manager'>
          <span>Manager</span>
        </LinkContainer>
        <LinkContainer to='/admin/about'>
          <span>About</span>
        </LinkContainer>
      </Menu>
    )
  }
}

Navigation.propTypes = { ManageStore: React.PropTypes.object }
