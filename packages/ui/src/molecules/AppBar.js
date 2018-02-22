import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../atoms/Icon'
import Link from '../atoms/Link'

const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(${props => props.theme.gridUnit} * 2);
`

const Section = styled.div`
  display: flex;
`

const Logo = styled.span`
  margin: calc(${props => props.theme.subGridUnit} * 2) 1rem
    calc(${props => props.theme.subGridUnit} * 2) 1rem;
  & svg {
    height: calc(${props => props.theme.gridUnit} * 2);
  }
`

const Item = styled.span`
  align-items: center;
  display: inline-flex;
  margin: calc(${props => props.theme.gridUnit} * 1) 1rem
    calc(${props => props.theme.gridUnit} * 1) 1rem;
`

const AppBar = ({
  brandLink = '/',
  brand,
  loginLink = '/login',
  onLogoutClick,
  navLinkComponents,
  user,
}) => (
  <Root>
    <Section>
      {brand && (
        <Logo>
          <Link to={brandLink}>{brand}</Link>
        </Logo>
      )}

      {navLinkComponents &&
        navLinkComponents.map((NavLinkComponent, idx) => (
          <span key={NavLinkComponent.props.to}>
            <Item>{NavLinkComponent}</Item>
            {idx < navLinkComponents.length - 1 && <Item>|</Item>}
          </span>
        ))}
    </Section>

    <Section>
      {user && (
        <Item>
          <Icon size={2}>user</Icon>
          {user.username}
          {user.admin ? ' (admin)' : ''}
        </Item>
      )}

      {user && (
        <Item>
          <Link onClick={onLogoutClick} to="#">
            <Icon size={2}>power</Icon>
            Logout
          </Link>
        </Item>
      )}

      {!user && (
        <Item>
          <Link to={loginLink}>Login</Link>
        </Item>
      )}
    </Section>
  </Root>
)

AppBar.propTypes = {
  brandLink: PropTypes.string,
  brand: PropTypes.node,
  loginLink: PropTypes.string,
  onLogoutClick: PropTypes.func,
  navLinkComponents: PropTypes.arrayOf(PropTypes.element),
  user: PropTypes.object,
}

export default AppBar
