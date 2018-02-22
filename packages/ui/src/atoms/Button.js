import React from 'react'
import styled from 'styled-components'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: ${props => props.theme.colorSecondary};
  border: ${props => props.theme.borderWidth}
    ${props => props.theme.borderStyle} ${props => props.theme.colorBorder};
  border-radius: ${props => props.theme.borderRadius};

  cursor: pointer;

  font-family: ${props => props.theme.fontInterface};
  font-size: inherit;
  letter-spacing: 0.05em;

  min-width: calc(${props => props.theme.gridUnit} * 4);
  height: calc(${props => props.theme.gridUnit} * 2);
  padding: 0 calc(${props => props.theme.gridUnit} / 4);
  margin-right: ${props => props.theme.subGridUnit};

  &:active {
    transform: scale(0.8);
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: ${props => props.theme.colorPrimary};
  border-color: ${props => props.theme.colorPrimary};
  color: ${props => props.theme.colorBackground};
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
  disabled: true,
})`
  background: ${props => props.theme.colorBackground};
  border-color: transparent;
  color: ${props => props.theme.colorSecondary};
  cursor: not-allowed;
`

const BasePlainButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  border: none;
  padding: 0;
  color: ${props => props.theme.colorPrimary};
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`

const DisabledPlainButton = BasePlainButton.extend.attrs({
  disabled: true,
})`
  &, &:hover, &:focus {
    color: ${props => props.theme.colorSecondary};
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
