import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Icon } from '@pubsweet/ui'

const RemoveButton = () => <Icon>X</Icon>

const StyledRemoveButton = styled(RemoveButton)`
  fill: ${th('colorTextReverse')};
  margin-left: ${th('space.1')};
`

const Root = styled.div`
  border-radius: ${th('borderRadius')};
  background-color: ${th('colorPrimary')};
  line-height: ${th('lineHeightBase')};
  padding: ${th('space.1')} ${th('space.2')} ${th('space.1')} ${th('space.2')}
  color: ${th('colorTextReverse')};
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
`

const SelectedItem = ({ label, onCloseClick }) => (
  <Root onClick={onCloseClick}>
    {label} <StyledRemoveButton />
  </Root>
)

export default SelectedItem
