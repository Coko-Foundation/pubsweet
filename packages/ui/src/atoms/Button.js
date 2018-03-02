import React from 'react'
import styled from 'styled-components'
import th from '../helpers/themeHelper'

const BaseStandardButton = styled.button.attrs({
  type: 'button',
})`
  background: ${th('colorSecondary')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};

  cursor: pointer;

  font-family: ${th('fontInterface')};
  font-size: inherit;
  letter-spacing: 0.05em;

  min-width: calc(${th('gridUnit')} * 4);
  height: calc(${th('gridUnit')} * 2);
  padding: 0 calc(${th('gridUnit')} / 4);
  margin-right: ${th('subGridUnit')};

  &:active {
    transform: scale(0.8);
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: ${th('colorPrimary')};
  border-color: ${th('colorPrimary')};
  color: ${th('colorBackground')};
`

const DisabledStandardButton = BaseStandardButton.extend.attrs({
  disabled: true,
})`
  background: ${th('colorBackground')};
  border-color: transparent;
  color: ${th('colorSecondary')};
  cursor: not-allowed;
`

const BasePlainButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  border: none;
  padding: 0;
  color: ${th('colorPrimary')};
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`

const DisabledPlainButton = BasePlainButton.extend.attrs({
  disabled: true,
})`
  &, &:hover, &:focus {
    color: ${th('colorSecondary')};
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
