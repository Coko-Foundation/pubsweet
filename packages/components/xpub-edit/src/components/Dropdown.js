import React from 'react'
import * as tablesFn from 'prosemirror-tables'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'
import { Menu } from '@pubsweet/ui'

const Opener = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: 0;
  // border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  cursor: pointer;
  font-family: inherit;

  width: 100%;
  height: calc(${th('gridUnit')} * 6);
  padding-left: 20px;

  display: flex;
  align-items: center;

  &:hover {
    // border-color: ${th('colorPrimary')};
  }
  &:after {
    content:'>';
    margin-left: 10px;
    transform: rotate(90deg);
  }

  ${override('ui.Menu.Opener')};
`

const MenuStyled = styled(Menu)`
  bottom: 10px;
  float: right;
  margin-right: 65%;
  position: relative;
  width: 10%;
`

const renderOpener = ({ placeholder, toggleMenu, open }) => (
  <Opener onClick={toggleMenu} open={open}>
    {placeholder}
  </Opener>
)

const Dropdown = ({ item, state, dispatch, ...rest }) => (
  <MenuStyled
    onChange={value => {
      tablesFn[value](state, dispatch)
    }}
    options={[
      { label: 'add column before', value: 'addColumnBefore' },
      { label: 'add column after', value: 'addColumnAfter' },
    ]}
    placeholder="Table Menu"
    renderOpener={renderOpener}
    {...rest}
  />
)

export default Dropdown
