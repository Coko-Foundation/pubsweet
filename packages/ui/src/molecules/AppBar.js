import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import theme from '../helpers/theme'
import Icon from '../atoms/Icon'

const Root = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(${theme.gridUnit} * 2);

  a {
    color: ${theme.colorPrimary};
    text-decoration: none;
  }
`

const Section = styled.div`
  display: flex;
`

const NavLinks = styled.div`
  align-items: center;
  display: flex;
  margin: 0 1rem;

  a {
    padding: 0 1rem;

    &:global(.active) {
      font-weight: bold;
    }
  }
`

const Logo = styled(Link)`
  display: flex;
  font-weight: bold;
  text-decoration: none;

  * {
    max-height: calc(${theme.gridUnit} * 2);
  }
`

const itemStyle = `
  align-items: center;
  display: inline-flex;
  padding: 0 1rem;

  svg {
    margin-right: 0.3rem;
  }
`

const Item = styled.span`
  ${itemStyle};
`
const ActionItem = Item.withComponent('a')
const LinkItem = styled(Link)`
  ${itemStyle};
`

const AppBar = ({
  brandLink = '/',
  brand,
  loginLink = '/login',
  onLogoutClick,
  navLinks,
  user,
  className,
}) => (
  <Root>
    <Section>
      {brand && <Logo to={brandLink}>{brand}</Logo>}

      {navLinks && <NavLinks>{navLinks}</NavLinks>}
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
        <ActionItem href="#" onClick={onLogoutClick}>
          <Icon size={2}>power</Icon>
          Logout
        </ActionItem>
      )}

      {!user && <LinkItem to={loginLink}>Login</LinkItem>}
    </Section>
  </Root>
)

export default AppBar
