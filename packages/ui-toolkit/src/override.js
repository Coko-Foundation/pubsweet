/*
  Helper to write overrides for your styled components.

  This is here so that you don't have to think about compatibility between this:

  cssOverrides.TextField = css``

  and this:

  cssOverrides.TextField = {
    Root: css``,
    Input: css``
  }

  in your theme.

  -------------------

  Usage:

  const TextField = styled.div`
    YOUR CSS HERE

    ${override('TextField')};
  `

  Now both of the above scenarios will work.

  NOTE: Makes the assumption that you are following the pubsweet convention of
        putting your overrides under the cssOverrides property of your theme
        object.
*/

import { css } from 'styled-components'
import th from './themeHelper'

const override = name => css`
  ${th(`cssOverrides.${name}`)};
  ${th(`cssOverrides.${name}.Root`)};
`

export default override
