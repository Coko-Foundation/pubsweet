import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button.attrs({
  type: 'button',
})`
  background: #ddd;
  border: none;
  cursor: pointer;
  font-family: var(--font-interface);
  font-size: inherit;
  letter-spacing: 0.05em;
  padding: 10px 20px;
  position: relative;
  text-transform: uppercase;

  &:hover,
  &:focus {
    background: #777;
    color: white;
    outline: 1px solid transparent;
  }

  &:active {
    transform: scale(0.8);
  }

  & ::after {
    animation: 1s warning;
    opacity: 1;
  }
`

const PrimaryButton = BaseButton.extend`
  background-color: var(--color-primary);
  border: 2px solid transparent;
  border-bottom: 4px solid var(--color-primary);
  color: white;

  &:hover {
    background: white;
    border: 2px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);
    color: var(--color-primary);
    outline: 1px solid transparent;
  }

  &:focus {
    background: white;
    border: 2px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);
    box-shadow: 0 2px 0 0 var(--color-primary);
    color: var(--color-primary);
    outline: 1px solid transparent;
  }
`

const DisabledButton = BaseButton.extend.attrs({
  disabled: true,
})`
  background: white;
  border: 2px solid transparent;
  border-bottom: 2px solid #bbb;
  color: #bbb;

  &:hover {
    background: transparent;
    border: 2px solid transparent;
    border-bottom: 2px solid #bbb;
    color: #aaa;
    cursor: not-allowed;
  }

  &:hover::after {
    color: var(--color-danger);
    content: 'sorry, this action is not possible';
    display: inline;
    font-size: 0.9em;
    font-style: italic;
    left: 115%;
    letter-spacing: 0;
    opacity: 1;
    position: absolute;
    text-align: left;
    text-transform: lowercase;
    top: 30%;
  }
`

const Button = ({ children, disabled, primary, ...props }) => {
  if (disabled) {
    return <DisabledButton {...props}>{children}</DisabledButton>
  }
  if (primary) {
    return <PrimaryButton {...props}>{children}</PrimaryButton>
  }
  return <BaseButton {...props}>{children}</BaseButton>
}

export default Button
