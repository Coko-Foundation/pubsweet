/* eslint-disable sort-keys */
/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { override, th } from '@pubsweet/ui-toolkit'

const Root = styled.label`
  display: flex;
  padding: ${th('gridUnit')};
  &:hover span {
    color: ${th('colorPrimary')};
  }
  ${override('ui.Toggle')};
`

const Label = styled.span`
  width: calc(5 * ${th('gridUnit')});
  height: ${th('gridUnit')};
  border-radius: ${th('gridUnit')};
  background: ${th('colorBackgroundHue')};
  border: 1px solid ${th('colorBackgroundHue')};
  cursor: pointer;
  margin: ${th('gridUnit')};

  &:before {
    content: ' ';
    display: inline-block;
    position: relative;
    width: calc(3 * ${th('gridUnit')});
    height: calc(3 * ${th('gridUnit')});
    border-radius: 50%;
    top: -${th('gridUnit')};
    left: ${props => (props.checked ? '24px' : '0px')};
    background: ${props =>
      props.checked ? props.theme.colorPrimary : props.theme.colorSecondary};
    transition: left 0.3s;
  }
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
  margin-right: ${th('gridUnit')};
`
const Span = styled.span`
  position: absolute;
  padding-left: calc(4 * ${th('gridUnit')});
  margin-top: -${th('gridUnit')};
`

const Toggle = ({
  label,
  labelChecked,
  name,
  disabled,
  required,
  value,
  checked,
  onChange,
}) => {
  checked = checked || false

  return (
    <Root>
      <Input
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={disabled ? undefined : onChange}
        required={required}
        type="checkbox"
        value={value}
      />
      <Label checked={checked}>
        {labelChecked && checked ? (
          <>
            <Span>{labelChecked}</Span>
          </>
        ) : (
          <>
            <Span>{label}</Span>
          </>
        )}
      </Label>
    </Root>
  )
}

Toggle.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelChecked: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
}

Toggle.defaultProps = {
  value: false,
  disabled: false,
  label: '',
  labelChecked: '',
  name: '',
  onChange: () => {},
}

export default Toggle
