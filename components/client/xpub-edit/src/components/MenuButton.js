import React from 'react'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Button = styled.button`
  background: ${th('colorBackground')};
  border: none;
  border-bottom: 2px solid transparent;
  color: #777;
  display: ${props => (props.select ? 'inline' : 'none')}
  cursor: pointer;
  height: 20px;
  margin: 0 0.4em;
  min-width: 20px;
  padding: 0;

  &:disabled {
    opacity: 0.2;
    color: #777;

    &:hover {
      border-bottom: none;
      color: #777;
    }
  }

  &:hover {
    border-bottom-color: ${th('colorPrimary')};
    color: ${th('colorPrimary')};
  }

  border-bottom-color: ${({ active }) => active && 'black'};

  ${override('xpub-edit.MenuButton.Button')};
`

const MenuButton = ({ item, state, handle }) => (
  <Button
    active={item.active && item.active(state)}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={handle}
    select={item.select && item.select(state)}
    title={item.title}
    type="button"
  >
    {item.content}
  </Button>
)

export default MenuButton
