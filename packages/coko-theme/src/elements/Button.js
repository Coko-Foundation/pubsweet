import { css } from 'styled-components'
import { darken, th } from '@pubsweet/ui-toolkit'

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
`
