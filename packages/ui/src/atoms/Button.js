// import React from 'react'
import { get } from 'lodash'
import styled, { css } from 'styled-components'
import th from '../helpers/themeHelper'

const primary = css`
  background: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};

  &:focus,
  &:hover {
    // DARKEN 30
    background-color: #16415d;
  }

  &:active {
    // DARKEN 50
    background-color: #102e43;
  }

  &[disabled] {
    &:focus,
    &:hover,
    &:active {
      background: ${th('colorPrimary')};
    }
  }
`

const StyledButton = styled.button.attrs({
  type: 'button',
})`
  background: ${th('colorSecondary')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('gridUnit')};
  min-width: calc(${th('gridUnit')} * 4);
  padding: calc(${th('gridUnit')} / 2);

  &:focus,
  &:hover {
    // DARKEN 30
    background-color: #a1a1a1;
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};
  }

  &:active {
    // DARKEN 50
    background-color: '#737373';
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;

    &:focus,
    &:hover,
    &:active {
      background: ${th('colorSecondary')};
    }
  }

  ${props => props.primary && primary} ${props =>
    get(props.theme, 'cssOverrides.Button')};
  ${props => get(props.theme, 'cssOverrides.Button.Root')};
`

export default StyledButton
