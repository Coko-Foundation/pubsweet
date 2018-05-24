import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const primary = css`
  background: none;
  border: none;
  color: ${th('colorPrimary')};
  padding: 0;
  text-decoration: underline;
  text-transform: none;

  &:hover {
    background: none;
    border: none;
    // DARKEN 30
    color: #16415d;
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
  ${props => !props.primary && primary};
`
