/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { components } from 'react-select'
import Select from './Select'
import { Icon } from '../atoms'

const Wrapper = styled.div`
  margin-bottom: calc(${th('gridUnit')} * 2);
  width: 400px;

  label {
    margin-bottom: calc(${th('gridUnit')});
  }

  div[role='listbox'] {
    div {
      div {
        margin-bottom: ${th('gridUnit')};
      }
    }
  }
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const Error = styled.span`
  color: ${th('colorError')};
  font-size: ${th('fontSizeBaseSmall')};
  padding-left: ${th('gridUnit')};
`

const SelectDropdown = props => {
  const {
    'data-test-id': dataTestId,
    error,
    label,
    options,
    required,
    touched,
    value,
    isDisabled,
    onChange,
    menuPlacement,
    DropdownIndicator,
    icon,
    ...rest
  } = props

  return (
    <Wrapper data-test-id={dataTestId}>
      {label && (
        <Label>
          {label}
          {required && ' *'}
          {touched && error && <Error>{error}</Error>}
        </Label>
      )}
      <Select
        components={{
          DropdownIndicator: props => (
            <components.DropdownIndicator {...props}>
              <Icon>{icon}</Icon>
            </components.DropdownIndicator>
          ),
        }}
        isDisabled={isDisabled}
        menuPlacement={menuPlacement}
        onChange={onChange}
        options={options}
        value={value}
        {...rest}
      />
    </Wrapper>
  )
}
SelectDropdown.defaultProps = {
  icon: 'chevron_down',
}

export default SelectDropdown
