import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Icon from '../atoms/Icon'

const Root = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1rem;

  a {
    color: var(--color-primary);
    text-decoration: none;

    &::before {
      color: #aaa;
      display: inline-block;
      height: 1em;
      margin-right: 0.3em;
      text-align: center;

      &:hover {
        color: var(--color-primary);
      }
    }
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
  font-weight: bold;
  text-decoration: none;

  &::before {
    content: '';
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
          <Icon size={16}>user</Icon>
          {user.username}
          {user.admin ? ' (admin)' : ''}
        </Item>
      )}

      {user && (
        <ActionItem href="#" onClick={onLogoutClick}>
          <Icon size={16}>power</Icon>
          Logout
        </ActionItem>
      )}

      {!user && <LinkItem to={loginLink}>Login</LinkItem>}
    </Section>
  </Root>
)

export default AppBar
