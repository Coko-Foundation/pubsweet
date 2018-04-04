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

  &:active,
  &:hover {
    // note: doesn't work in IE
    filter: brightness(80%);
  }

  &[disabled] {
    filter: none;
    opacity: 0.8;
    cursor: not-allowed;
  }
`

const PrimaryStandardButton = BaseStandardButton.extend`
  background-color: ${th('colorPrimary')};
  border-color: ${th('colorPrimary')};
  color: ${th('colorBackground')};
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

  &[disabled] {
    color: ${th('colorTextPlaceholder')};
    opacity: 0.8;
    cursor: not-allowed;
  }
`

const Button = ({ primary, plain, ...props }) => {
  if (primary) {
    return <PrimaryStandardButton {...props} />
  }
  if (plain) {
    return <BasePlainButton {...props} />
  }
  return <BaseStandardButton {...props} />
}

export default Button
