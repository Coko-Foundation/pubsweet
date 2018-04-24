import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import th from '../helpers/themeHelper'
import { Icon, Link } from '../atoms'
import PlainButton from './PlainButton'

// #region styled-components
const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(${th('gridUnit')} * 2);
`

const Section = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.span`
  margin: calc(${th('subGridUnit')} * 2) 1rem calc(${th('subGridUnit')} * 2)
    1rem;
`

const LogoLink = Link.extend`
  & > * {
    height: calc(${th('gridUnit')} * 2);
  }
`

const Item = styled.span`
  align-items: center;
  display: inline-flex;
  margin: calc(${th('gridUnit')} * 1) 1rem calc(${th('gridUnit')} * 1) 1rem;
`
// #endregion

const AppBar = ({
  brandLink = '/',
  brand,
  loginLink = '/login',
  onLogoutClick,
  navLinkComponents,
  user,
  rightComponent: RightComponent = DefaultRightComponent,
}) => (
  <Root>
    <Section>
      {brand && (
        <Logo>
          <LogoLink to={brandLink}>{brand}</LogoLink>
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
    <RightComponent
      loginLink={loginLink}
      onLogoutClick={onLogoutClick}
      user={user}
    />
  </Root>
)

const DefaultRightComponent = ({ user, onLogoutClick, loginLink }) => (
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
        <PlainButton onClick={onLogoutClick}>
          <Icon size={2}>power</Icon>
          Logout
        </PlainButton>
      </Item>
    )}

    {!user && (
      <Item>
        <Link to={loginLink}>Login</Link>
      </Item>
    )}
  </Section>
)

AppBar.propTypes = {
  brandLink: PropTypes.string,
  brand: PropTypes.node,
  loginLink: PropTypes.string,
  onLogoutClick: PropTypes.func,
  user: PropTypes.object,
  navLinkComponents: PropTypes.arrayOf(PropTypes.element),
  rightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default AppBar
