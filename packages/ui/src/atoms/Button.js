import React from 'react'
import styled from 'styled-components'
import theme from '../helpers/theme'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: ${theme.colorSecondary};
  border: ${theme.borderWidth} ${theme.borderStyle} ${theme.colorBorder};
  border-radius: ${theme.borderRadius};

  cursor: pointer;

  font-family: ${theme.fontInterface};
  font-size: inherit;
  letter-spacing: 0.05em;

  min-width: calc(${theme.gridUnit} * 4);
  height: calc(${theme.gridUnit} * 2);
  padding: 0 calc(${theme.gridUnit} / 4);
  margin-right: ${theme.subGridUnit};

  &:active {
    transform: scale(0.8);
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: ${theme.colorPrimary};
  border-color: ${theme.colorPrimary};
  color: ${theme.colorBackground};
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
  disabled: true,
})`
  background: ${theme.colorBackground};
  border-color: transparent;
  color: ${theme.colorSecondary};
  cursor: not-allowed;
`

const BasePlainButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  border: none;
  padding: 0;
  color: ${theme.colorPrimary};
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`

const DisabledPlainButton = BasePlainButton.extend.attrs({
  disabled: true,
})`
  &, &:hover, &:focus {
    color: ${theme.colorSecondary};
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
