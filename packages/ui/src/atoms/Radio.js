import React from 'react'
import styled, { keyframes } from 'styled-components'

const Input = styled.input`
  display: none;
`

const PseudoInput = styled.span`
  display: inline-block;
  content: ' ';
  width: var(--sub-grid-unit);
  height: var(--sub-grid-unit);
  vertical-align: center;
  margin-left: var(--sub-grid-unit);
  margin-right: var(--sub-grid-unit);

  /* This is not a real border (box-shadow provides that), so not themed as such */
  border: 2px solid white;
  border-radius: 50%;

  transition: border var(--transition-duration-unit)
    var(--transition-timing-function);

  color: ${props => props.color};
`

const Label = styled.span`
  display: inline-block;
  font-family: inherit;
  font-size: var(--font-size-base);
  font-style: italic;
`

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

const Root = styled.label`
  align-items: center;
  cursor: pointer;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  transition: all var(--transition-duration);

  &:not(:last-child) {
    margin-right: ${props => (props.inline ? 'var(--grid-unit)' : '0')};
    margin-bottom: ${props => (props.inline ? '0' : 'var(--sub-grid-unit)')};
  }

  ${PseudoInput} {
    background: ${props => (props.checked ? 'currentcolor' : 'transparent')};
    box-shadow: 0 0 0 var(--border-width) currentcolor;
  }

  &:hover {
    ${Label} {
      color: ${props => (props.checked ? 'inherit' : 'var(--color-primary)')};
    }

    ${PseudoInput} {
      animation-name: ${props => (props.checked ? 'none' : checking)};
      animation-duration: calc(var(--transition-duration-unit) * 2);
      box-shadow: 0 0 0 var(--border-width)
        ${props => (props.checked ? 'currentcolor' : 'var(--color-primary)')};
    }
  }
  color: ${props => props.color};
`

/* Not used for now
.root.author {
  font-family: var(--font-author);
}

.root.author span {
  font-size: 1.3em;
  text-transform: lowercase;
}
*/

const Radio = ({
  className,
  color = 'black',
  inline,
  name,
  value,
  label,
  checked,
  required,
  onChange,
  readonly,
}) => (
  <Root checked={checked} color={color}>
    <Input
      checked={checked}
      disabled={readonly}
      name={name}
      onChange={onChange}
      required={required}
      type="radio"
      value={value}
    />{' '}
    <PseudoInput color={color} /> <Label> {label} </Label>{' '}
  </Root>
)

export default Radio
