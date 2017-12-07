import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import classes from './AppBar.local.scss'
import Icon from '../atoms/Icon'

const AppBar = ({
  brandLink = '/',
  brandName,
  loginLink = '/login',
  onLogoutClick,
  navLinks,
  user,
  className,
}) => (
  <nav className={classnames(classes.root, className)}>
    <div className={classes.section}>
      <Link className={classes.logo} to={brandLink}>
        {brandName}
      </Link>

      {navLinks && <div className={classes.navLinks}>{navLinks}</div>}
    </div>

    <div className={classes.section}>
      {user && (
        <span className={classes.item}>
          <Icon size={16}>user</Icon>
          {user.username}
          {user.admin ? ' (admin)' : ''}
        </span>
      )}

      {user && (
        <a className={classes.item} href="#" onClick={onLogoutClick}>
          <Icon size={16}>power</Icon>
          Logout
        </a>
      )}

      {!user && (
        <Link className={classes.item} to={loginLink}>
          Login
        </Link>
      )}
    </div>
  </nav>
)

export default AppBar
