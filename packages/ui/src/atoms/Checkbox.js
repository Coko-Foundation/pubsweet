import React from 'react'
import styled, { keyframes } from 'styled-components'
import th from '../helpers/themeHelper'

const checking = keyframes`
  0% {
    transform: scale(0.8);
  }
  20% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`

const localBorderSize = '3px'
const localBorderTwoSize = '1px'

const Root = styled.label`
  align-items: center;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  font-family: ${th('fontAuthor')};
  font-style: italic;
  letter-spacing: 1px;
  transition: all 2s;

  &:not(:last-child) {
    margin-right: ${props => (props.inline ? '2.7em' : '0')};
  }

  & input {
    display: none;
    margin-right: 0.25rem;
  }

  & span {
    font-size: 1.1em;
    transition: color 0.5s;
  }

  &:hover span {
    color: ${th('colorPrimary')};
  }

  & span::before {
    content: ' ';
    display: inline-block;
    vertical-align: middle;

    width: 0.7em;
    height: 0.7em;
    margin-right: 0.5em;

    background: ${props => (props.checked ? 'currentcolor' : 'transparent')};
    border: ${localBorderSize} solid white;
    box-shadow: 0 0 0 ${localBorderTwoSize} currentcolor;

    transition: border 0.5s ease, background-size 0.3s ease;
  }

  &:hover span::before {
    animation: ${checking} 0.5s;

    background: ${th('colorPrimary')};
    box-shadow: 0 0 0 ${localBorderTwoSize} ${th('colorPrimary')};
  }
`

const Checkbox = ({
  inline,
  name,
  value,
  label,
  checked,
  required,
  onChange,
}) => {
  checked = checked || false

  return (
    <Root checked={checked} inline={inline}>
      <input
        checked={checked}
        name={name}
        onChange={onChange}
        required={required}
        type="checkbox"
        value={value}
      />
      <span>{label}</span>
    </Root>
  )
}

export default Checkbox
