/* eslint-disable sort-keys */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { override, th } from '@pubsweet/ui-toolkit'

const Root = styled.div`
  display: flex;
  padding: 10px;
  ${override('ui.Toggle')};
`

const Input = styled.span`
  width: calc(5 * ${th('gridUnit')});
  height: ${th('gridUnit')};
  border-radius: ${th('gridUnit')};
  background: ${th('colorBackgroundHue')};
  border: 1px solid ${th('colorBackgroundHue')};
  position: relative;
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
    left: ${props => (props.checked ? '20px' : '0px')};
    background: ${props =>
      props.checked ? props.theme.colorPrimary : props.theme.colorSecondary};
    transition: left 0.3s;
  }
`

const Label = styled.div`
  padding-top: 10px;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('gridUnit')};
`

const Toggle = ({ label, labelChecked, name, disabled, value, onClick }) => {
  const [ischecked, setChecked] = useState(value || false)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <Root>
      <Input
        checked={ischecked}
        name={name}
        onClick={() => {
          if (!disabled) {
            onClick(!ischecked)
            setChecked(!ischecked)
          }
        }}
        type="checkbox"
        value={ischecked ? 'true' : 'false'}
      />
      {labelChecked && ischecked ? (
        <>
          <Label>{labelChecked}</Label>
        </>
      ) : (
        <>
          <Label>{label}</Label>
        </>
      )}
    </Root>
  )
}

Toggle.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelChecked: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
}

Toggle.defaultProps = {
  value: false,
  disabled: false,
  label: '',
  labelChecked: '',
  name: '',
  onClick: () => {},
}

export default Toggle
