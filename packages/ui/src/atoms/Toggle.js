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

const ToggleUI = styled.div`
  /* color: #171717; */
  width: 37.71px;
  height: 6.08px;
  border-radius: ${th('gridUnit')};
  background: ${th('colorBackgroundHue')};
  border: 1px solid ${th('colorBackgroundHue')};
  position: relative;
  cursor: pointer;
  margin: ${th('gridUnit')};
`

const ToggleButton = styled.div`
  position: absolute;
  top: -${th('gridUnit')};
  right: ${props => (props.checked ? '-2px' : '50%')};
  width: 21px;
  height: 21px;
  background: ${props =>
    props.checked ? props.theme.colorPrimary : props.theme.colorSecondary};
  border-radius: 50%;
  transition: right 0.3s;
`

const Label = styled.div`
  padding-top: 10px;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('gridUnit')};
`

const Input = styled.input`
  visibility: hidden;
  width: 1px;
  position: absolute;
`

const Toggle = ({ label, labelChecked, name, disabled, value, onClick }) => {
  const [ischecked, setChecked] = useState(value || false)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <Root>
      <Input name={name} type="text" value={ischecked ? 'true' : 'false'} />

      <ToggleUI
        checked={ischecked}
        onClick={() => {
          if (!disabled) {
            onClick(!ischecked)
            setChecked(!ischecked)
          }
        }}
      >
        <ToggleButton checked={ischecked} />
      </ToggleUI>
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
