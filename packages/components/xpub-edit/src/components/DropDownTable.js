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

  &:focus {
    outline: none;
  }

  ${override('ui.Menu.Opener')};
`

const MenuStyled = styled(Menu)`
  display: ${props => (props.select ? 'inline-flex' : 'none')};
  button {
    height: 20px;
    width: 170px;
  }
`

const renderOpener = ({ placeholder, toggleMenu, open }) => (
  <Opener onClick={toggleMenu} open={open}>
    {placeholder}
  </Opener>
)

const dropDownOptions = [
  { label: 'add column before', value: 'addColumnBefore' },
  { label: 'add column after', value: 'addColumnAfter' },
  { label: 'Delete column', value: 'deleteColumn' },
  { label: 'Insert row before', value: 'addRowBefore' },
  { label: 'Insert row after', value: 'addRowAfter' },
  { label: 'Delete row', value: 'deleteRow' },
  { label: 'Delete table', value: 'deleteTable' },
  { label: 'Merge cells', value: 'mergeCells' },
  { label: 'Split cell', value: 'splitCell' },
  { label: 'Toggle header column', value: 'toggleHeaderColumn' },
  { label: 'Toggle header row', value: 'toggleHeaderRow' },
  { label: 'Toggle header cells', value: 'toggleHeaderCell' },
]

const Dropdown = ({ item, state, dispatch, ...rest }) => (
  <MenuStyled
    onChange={value => {
      tablesFn[value](state, dispatch)
    }}
    options={dropDownOptions}
    placeholder="Table Menu"
    renderOpener={renderOpener}
    select={item.select && item.select(state)}
    {...rest}
  />
)

export default Dropdown
