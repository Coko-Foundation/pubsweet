import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Button, TextField } from '../atoms'

const InputContainer = styled.div`
  display: flex;

  & > div {
    flex: 1;
  }
`

const StyledTextField = styled(TextField)`
  margin-bottom: 0;

  & input {
    box-sizing: border-box;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }
`

const AddOnButton = styled(Button)`
  border-radius: 0px;
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-right-width: 0;
  fill: ${th('colorTextReverse')};
  line-height: 0;
  min-width: 0;
  padding: ${th('space.1')};
  margin: 0;
  width: calc(${th('gridUnit')} * 6);
  height: calc(${th('gridUnit')} * 6);
  &:last-child {
    border-right-width: ${th('borderWidth')}
    border-radius: 0 ${th('borderRadius')} ${th('borderRadius')} 0;
  }
`

const InputWithAddons = ({ addons, inputProps, ...props }) => (
  <InputContainer {...props}>
    <div>
      <StyledTextField {...inputProps} />
    </div>
    {addons.map((itemConfig, index) => (
      <AddOnButton
        key={itemConfig.buttonProps.key || index}
        {...itemConfig.buttonProps}
      >
        {' '}
        {itemConfig.icon}{' '}
      </AddOnButton>
    ))}
  </InputContainer>
)

export default InputWithAddons
