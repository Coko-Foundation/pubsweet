import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { override, th } from '@pubsweet/ui-toolkit'

import { Icon2 } from '../atoms'
import Action from './Action'

const UserIcon = props => (
  <Icon2 iconName="User" overrideName="@pubsweet.ui.AppBar.User" {...props} />
)

const StyledUserIcon = styled(UserIcon)`
  height: calc(2 * ${th('gridUnit')})
  width: calc(2 * ${th('gridUnit')})
  ${override('ui.AppBar.UserIcon')}
`

const PowerIcon = props => (
  <Icon2 iconName="Power" overrideName="@pubsweet.ui.AppBar.Power" {...props} />
)

const StyledPowerIcon = styled(PowerIcon)`
  height: calc(2 * ${th('gridUnit')})
  width: calc(2 * ${th('gridUnit')})
  ${override('ui.AppBar.PowerIcon')}
`

// #region styled-components
const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(${th('gridUnit')} * 6);

  ${override('ui.AppBar')};
`

const Section = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.span`
  margin: calc(${th('gridUnit')} * 2) 1rem calc(${th('gridUnit')} * 2) 1rem;

  ${override('ui.AppBar.Logo')};
`

const LogoLink = styled(Action)`
  & > * {
    height: calc(${th('gridUnit')} * 6);
  }

  ${override('ui.AppBar.LogoLink')};
`

const Item = styled.span`
  align-items: center;
  display: inline-flex;
  margin: calc(${th('gridUnit')} * 3) 1rem calc(${th('gridUnit')} * 3) 0;
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
        <StyledUserIcon />
        {user.username}
        {user.admin ? ' (admin)' : ''}
      </Item>
    )}

    {user && (
      <Item>
        <StyledPowerIcon />
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
