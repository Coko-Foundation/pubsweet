// import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import th from '../helpers/themeHelper'

const StyledButton = styled.button.attrs({
  type: 'button',
})`
  background: ${props =>
    props.primary ? th('colorPrimary') : th('colorSecondary')};

  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  color: ${props => (props.primary ? th('colorTextReverse') : th('colorText'))}
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('gridUnit')};
  min-width: calc(${th('gridUnit')} * 4);
  padding: calc(${th('gridUnit')} / 2);

  &:focus,
  &:hover {
    // DARKEN 30
    background-color: ${props => (props.primary ? '#16415D' : '#A1A1A1')};
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};
  }

  &:active {
    // DARKEN 50
    background-color: ${props => (props.primary ? '#102E43' : '#737373')};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;

    &:focus,
    &:hover,
    &:active {
      background: ${props =>
        props.primary ? th('colorPrimary') : th('colorSecondary')};
    }
  }

  ${props => get(props.theme, 'cssOverrides.Button')}
`

export default StyledButton
