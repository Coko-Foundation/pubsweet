import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Icon } from '@pubsweet/ui'

const RemoveButton = ({ onClick }) => <Icon onClick={onClick}>X</Icon>

const StyledRemoveButton = styled(RemoveButton)`
  margin-left: ${th('space.1')};

  & > svg {
    stroke: ${th('colorTextReverse')};
  }
`

const Root = styled.div`
  border-radius: ${th('borderRadius')};
  background-color: ${th('colorPrimary')};
  line-height: ${th('lineHeightBase')};
  padding: ${th('gridUnit')} ${th('gridUnit')} ${th('gridUnit')}
    calc(${th('gridUnit')} * 2);
  color: ${th('colorTextReverse')};
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
  font-family: 'Noto Sans';
`

const SelectedItem = ({ label, onCloseClick }) => (
  <Root>
    {label} <StyledRemoveButton onClick={onCloseClick} />
  </Root>
)

export default SelectedItem
