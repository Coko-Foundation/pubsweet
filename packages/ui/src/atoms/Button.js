import styled, { css } from 'styled-components'
import { darken, override, th } from '@pubsweet/ui-toolkit'

const primary = css`
  background: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};

  &:focus,
  &:hover {
    background-color: ${darken('colorPrimary', 0.3)};
  }

  &:active {
    background-color: ${darken('colorPrimary', 0.5)};
  }

  &[disabled] {
    &:focus,
    &:hover,
    &:active {
      background: ${th('colorPrimary')};
    }
  }
`

const StyledButton = styled.button.attrs(() => ({
  type: 'button',
}))`
  background: ${th('colorSecondary')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: calc(${th('gridUnit')} * 3);
  min-width: calc(${th('gridUnit')} * 12);
  padding: ${th('gridUnit')};

  &:focus,
  &:hover {
    background-color: ${darken('colorSecondary', 0.3)};
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};
  }

  &:active {
    background-color: ${darken('colorSecondary', 0.5)};
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

  ${props => props.primary && primary};
  ${override('ui.Button')};
`

export default StyledButton
