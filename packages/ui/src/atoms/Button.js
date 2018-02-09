import React from 'react'
import styled from 'styled-components'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: var(--color-secondary);
  border: var(--border-width) var(--border-style) var(--color-border);
  border-radius: var(--border-radius);

  cursor: pointer;

  font-family: var(--font-interface);
  font-size: inherit;
  letter-spacing: 0.05em;

  height: var(--grid-unit);
  padding: 0 calc(var(--grid-unit) / 2);

  &:active {
    transform: scale(0.8);
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-background);
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
  disabled: true,
})`
  background: var(--color-background);
  border-color: transparent;
  color: var(--color-secondary);
  cursor: not-allowed;
`

const BasePlainButton = BaseStandardButton.extend`
  background: none;
  border: 0;
  border-bottom: var(--border-width) var(--border-style) var(--color-secondary);
  border-radius: 0;
  font-style: italic;
  letter-spacing: 0;
  padding: 0;
  text-transform: none;

  &:active {
    transform: scale(0.99);
  }
`

const DisabledPlainButton = BasePlainButton.extend.attrs({
  disabled: true,
})`
  background: none;
  border-color: var(--color-secondary);
  color: var(--color-secondary);
  cursor: not-allowed;
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
