import { css } from 'styled-components'
import { darken, th } from '@pubsweet/ui-toolkit'

const secondary = css`
  background: none;
  border: none;
  color: ${th('colorPrimary')};
  padding: 0;
  text-decoration: underline;

  &:hover,
  &:focus,
  &:active {
    background: none;
    border: none;
    color: ${darken('colorPrimary', 0.3)};
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
  text-transform: uppercase;
  ${props => !props.primary && secondary};
`
