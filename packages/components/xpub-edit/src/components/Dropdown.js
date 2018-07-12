import React from 'react'
import * as tablesFn from 'prosemirror-tables'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'
import { Menu } from '@pubsweet/ui'

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  cursor: pointer;
  font-family: inherit;

  width: 100%;
  height: calc(${th('gridUnit')} * 6);
  padding: 0;

  display: flex;
  align-items: center;

  &:hover {
    border-color: ${th('colorPrimary')};
  }

  ${override('ui.Menu.Opener')};
`

const MenuStyled = styled(Menu)``

const renderOpener = ({ placeholder, toggleMenu, open }) => (
  <Opener onClick={toggleMenu} open={open}>
    {placeholder}
  </Opener>
)

const Dropdown = ({ item, state, dispatch, ...rest }) => (
  <MenuStyled
    options={[
      { label: 'add column before', value: 'addColumnBefore' },
      { label: 'add column after', value: 'addColumnAfter' },
    ]}
    renderOpener={renderOpener}
    placeholder="Table Menu"
    onChange={value => {
      tablesFn[value](state, dispatch)
    }}
    {...rest}
  />
)

export default Dropdown
