import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const doubleLineHeight = css`
  line-height: calc(${th('gridUnit')} * 2);
`

const headingMargin = level => css`
  margin: calc(
      (
          ${th('gridUnit')} * ${level <= 3 ? 2 : 1} -
            ${th(`fontSizeHeading${level}`)}
        ) / 2
    )
    0;
`

export default {
  h1: css`
    ${doubleLineHeight};
    ${headingMargin(1)};
  `,
  h2: css`
    ${doubleLineHeight};
    ${headingMargin(2)};
  `,
  h3: css`
    ${doubleLineHeight};
    ${headingMargin(3)};
  `,
  h4: css`
    ${headingMargin(4)};
  `,
  h5: css`
    ${headingMargin(5)};
  `,
  h6: css`
    ${headingMargin(6)};
  `,
}
