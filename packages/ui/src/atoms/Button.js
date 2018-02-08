import React from 'react'
import styled from 'styled-components'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: #ddd;
  border: none;
  cursor: pointer;
  font-family: var(--font-interface);

  font-size: inherit;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  height: var(--grid-unit);
  padding: 0 20px;

  &:hover,
  &:focus {
    background: #777;
    color: white;
    outline: 1px solid transparent;
  }

  &:active {
    transform: scale(0.8);
  }

  &::after {
    animation: 1s warning;
    opacity: 1;
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: var(--color-primary);
  border: 2px solid transparent;
  border-bottom: 4px solid var(--color-primary);
  color: white;

  &:hover,
  &:focus {
    background: white;
    border: 2px solid var(--color-primary);
    border-bottom: 4px solid var(--color-primary);
    color: var(--color-primary);
    outline: 1px solid transparent;
  }

  &:focus {
    box-shadow: 0 2px 0 0 var(--color-primary);
  }
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
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

const plainButtonOverrides = `
  background: none;
  border: 0;
  border-bottom: 2px solid #777;
  font-style: italic;
  letter-spacing: 0;
  padding: 0;
  text-transform: none;

  &:hover,
  &:focus {
    background: transparent;
    border: 0;
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }

  &:active {
    transform: scale(0.99);
  }
`

const DisabledPlainButton = DisabledStandardButton.extend`
  ${plainButtonOverrides};
`
const BasePlainButton = BaseStandardButton.extend`
  ${plainButtonOverrides};
`

const Button = ({ children, disabled, primary, plain, ...props }) => {
  if (!plain && disabled) {
    return (
      <DisabledStandardButton {...props}>{children}</DisabledStandardButton>
    )
  }
  if (primary) {
    return <PrimaryStandardButton {...props}>{children}</PrimaryStandardButton>
  }
  if (plain && disabled) {
    return <DisabledPlainButton {...props}>{children}</DisabledPlainButton>
  }
  if (plain) {
    return <BasePlainButton {...props}>{children}</BasePlainButton>
  }
  return <BaseStandardButton {...props}>{children}</BaseStandardButton>
}

export default Button
