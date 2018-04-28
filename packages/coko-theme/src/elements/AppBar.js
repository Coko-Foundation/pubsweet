import { css } from 'styled-components'

/*
  To disable underline from Logo
*/

export default {
  LogoLink: css`
    &:hover:before {
      visibility: hidden;
    }
  `,
}
