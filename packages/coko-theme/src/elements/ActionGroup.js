import { css } from 'styled-components'

const th = name => props => props.theme[name]

export default {
  Root: css`
    > * {
      &:last-child {
        border-right: 0;
      }
    }
  `,
  ActionWrapper: css`
    border-right: 1px solid ${th('colorPrimary')};
  `,
}
