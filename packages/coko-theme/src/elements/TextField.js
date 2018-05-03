import { css } from 'styled-components'

const th = name => props => props.theme[name]

export default {
  // TODO
  // -- input padding: breaking the grid?
  // -- small placeholder text? maybe by default?
  Input: css`
    border-width: 0 0 1px 0;
    border-style: dashed;
    border-color: ${props => {
      switch (props.validationStatus) {
        case 'success':
          return props.theme.colorSuccess
        case 'error':
          return props.theme.colorError
        default:
          return props.theme.colorBorder
      }
    }};
    color: ${props => {
      switch (props.validationStatus) {
        case 'success':
          return props.theme.colorSuccess
        case 'error':
          return props.theme.colorError
        default:
          return 'inherit'
      }
    }};
    height: calc(${th('gridUnit')} * 2);
    outline: 0;
    padding: 0 0 0 2px;
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};

    &:focus {
      border-color: ${th('colorPrimary')};
      color: inherit;
    }

    &::placeholder {
      font-size: ${th('fontSizeBaseSmall')};
    }
  `,
}
