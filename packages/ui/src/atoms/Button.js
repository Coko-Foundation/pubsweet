import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: ${fromTheme('colorSecondary')};
  border: ${fromTheme('borderWidth')} ${fromTheme('borderStyle')}
    ${fromTheme('colorBorder')};
  border-radius: ${fromTheme('borderRadius')};

  cursor: pointer;

  font-family: ${fromTheme('fontInterface')};
  font-size: inherit;
  letter-spacing: 0.05em;

  min-width: calc(${fromTheme('gridUnit')} * 4);
  height: calc(${fromTheme('gridUnit')} * 2);
  padding: 0 calc(${fromTheme('gridUnit')} / 4);
  margin-right: ${fromTheme('subGridUnit')};

  &:active {
    transform: scale(0.8);
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: ${fromTheme('colorPrimary')};
  border-color: ${fromTheme('colorPrimary')};
  color: ${fromTheme('colorBackground')};
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
  disabled: true,
})`
  background: ${fromTheme('colorBackground')};
  border-color: transparent;
  color: ${fromTheme('colorSecondary')};
  cursor: not-allowed;
`

const BasePlainButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  border: none;
  padding: 0;
  color: ${fromTheme('colorPrimary')};
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`

const DisabledPlainButton = BasePlainButton.extend.attrs({
  disabled: true,
})`
  &, &:hover, &:focus {
    color: ${fromTheme('colorSecondary')};
    cursor: not-allowed;
  }
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
