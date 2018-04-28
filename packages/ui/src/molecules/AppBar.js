import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import th from '../helpers/themeHelper'
import { Icon } from '../atoms'
import Action from './Action'

// #region styled-components
const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(${th('gridUnit')} * 2);

  ${props => get(props.theme, 'cssOverrides.AppBar')};
  ${props => get(props.theme, 'cssOverrides.AppBar.Root')};
`

const Section = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.span`
  margin: calc(${th('subGridUnit')} * 2) 1rem calc(${th('subGridUnit')} * 2)
    1rem;

  ${props => get(props.theme, 'cssOverrides.AppBar.Logo')};
`

const LogoLink = styled(Action)`
  & > * {
    height: calc(${th('gridUnit')} * 2);
  }

  ${props => get(props.theme, 'cssOverrides.AppBar.LogoLink')};
`

const Item = styled.span`
  align-items: center;
  display: inline-flex;
  margin: calc(${th('gridUnit')} * 1) 1rem calc(${th('gridUnit')} * 1) 0;
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
        <Icon size={2}>power</Icon>
        <Action onClick={onLogoutClick}>Logout</Action>
      </Item>
    )}

    {!user && (
      <Item>
        <Action to={loginLink}>Login</Action>
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
