import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

/**
 * TODO
 *
 * font-size & line-height might change to fontSizeBase in the future
 *
 * move root margin-bottom at page level
 */
export default {
  Input: css`
    border: ${th('borderWidth')} ${th('borderStyle')}
      ${({ validationStatus }) =>
        validationStatus === 'error' ? th('colorError') : th('colorBorder')};
    font-family: ${th('fontInterface')};
    font-size: 16px;
    line-height: 24px;
    padding: calc(${th('gridUnit')} * 2);
    height: calc(${th('gridUnit')} * 8);
  `,
  Label: css`
    margin-bottom: ${th('gridUnit')};
  `,
  Root: css`
    margin-bottom: 0px;
  `,
}
