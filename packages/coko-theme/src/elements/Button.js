import { css } from 'styled-components'
import { darken, th } from '@pubsweet/ui-toolkit'

const borderColor = props => (props.color ? props.color : props.colorPrimary)
const outline = css`
  border: ${th('borderWidth')} ${th('borderStyle')} ${borderColor};
  text-decoration: none;
  padding: ${props => (props.size === 'small' ? '0' : props.theme.gridUnit)};

  &:hover,
  &:focus,
  &:active {
    border: ${th('borderWidth')} ${th('borderStyle')} ${borderColor};
  }
`
const ghost = css`
  text-decoration: none;
  padding: ${props => (props.size === 'small' ? '0' : props.theme.gridUnit)};
  &:hover,
  &:focus,
  &:active {
    background-color: ${th('colorSecondary')};
  }
`

const secondary = css`
  background: none;
  border: none;
  color: ${props => (props.color ? props.color : props.theme.colorPrimary)};
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    background: none;
    border: none;
    color: ${props =>
      props.color
        ? darken(props.color, 0.3)
        : darken(props.theme.colorPrimary, 0.3)};
    outline: none;
  }

  &[disabled] {
    color: ${th('colorTextPlaceholder')};

    &:hover {
      background: none;
    }
  }
`

export default css`
  line-height: calc(${th('gridUnit')} * 4);
  min-width: calc(${th('gridUnit')} * 16);
  text-transform: uppercase;
  ${props => !props.primary && secondary};
  ${props => props.outline && outline};
  ${props => props.ghost && ghost};
`
