import React from 'react'
import styled, { keyframes } from 'styled-components'

const Input = styled.input`
  display: none;
`

const PseudoInput = styled.span`
  --local-border-size: 2px;
  --local-borderTwo-size: 1px;

  display: inline-block;
  content: ' ';
  width: 0.6em;
  height: 0.6em;
  vertical-align: center;
  margin-left: 0.2em;
  margin-right: 0.6em;

  border: var(--local-border-size) var(--border-style) var(--color-border);
  border-radius: 50%;

  transition: border 0.2s var(--transition-timing-function);
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
  transition: all 2s;

  &:not(:last-child) {
    margin-right: ${props => (props.inline ? '2.7em' : '0')};
    margin-bottom: ${props => (props.inline ? '0' : '0.5rem')};
  }

  ${PseudoInput} {
    background: ${props => (props.checked ? 'currentcolor' : 'transparent')};
    box-shadow: 0 0 0 var(--local-borderTwo-size) currentcolor;
  }

  &:hover {
    ${Label} {
      color: ${props => (props.checked ? 'inherit' : 'var(--color-primary)')};
    }

    ${PseudoInput} {
      animation-name: ${props => (props.checked ? 'none' : checking)};
      animation-duration: 0.5s;
      box-shadow: 0 0 0 var(--local-borderTwo-size)
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
