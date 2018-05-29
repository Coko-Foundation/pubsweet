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

  NOTE: The Array.isArray statement is there so that (if the overrides statement
        evaluates to an object) the object keys don't get inserted into the css
        as properties.
*/

import { get } from 'lodash'
import { css } from 'styled-components'
import th from './themeHelper'

const override = name => css`
  ${props => {
    const v = get(props.theme, `cssOverrides.${name}`)
    return Array.isArray(v) ? v : null
  }};
  ${th(`cssOverrides.${name}.Root`)};
`

export default override
