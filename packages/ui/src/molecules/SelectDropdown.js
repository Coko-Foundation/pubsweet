/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'

import { th } from '@pubsweet/ui-toolkit'
import Select from './Select'

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
  /* display: block; */
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
    // name,
    options,
    required,
    // setFieldValue,
    touched,
    value,
    isDisabled,
    onChange,
    menuPlacement,
    ...rest
  } = props

  // const onChange = newValue => setFieldValue(name, newValue.value)

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
        isDisabled={isDisabled}
        onChange={onChange}
        options={options}
        value={value}
        {...rest}
      />
    </Wrapper>
  )
}

export default SelectDropdown
