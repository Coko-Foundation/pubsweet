/*
  Helper to write overrides for your styled components.

  This is here so that you don't have to think about compatibility between this:

  cssOverrides.ui.TextField = css``

  and this:

  cssOverrides.ui.TextField = {
    Root: css``,
    Input: css``
  }

  in your theme.

  -------------------

  Usage:

  const TextField = styled.div`
    YOUR CSS HERE

    ${override('ui.TextField')};
  `

  Now both of the above scenarios will work.

  NOTE: Makes the assumption that you are following the pubsweet convention of
        putting your overrides under the cssOverrides property of your theme
        object.
*/

import { css } from 'styled-components'
import { get, has } from 'lodash'
import th from './themeHelper'

const override = name => props => {
  if (has(get(props.theme.cssOverrides, name), 'Root')) {
    return css`
      ${th(`cssOverrides.${name}.Root`)};
    `
  }
  return css`
    ${th(`cssOverrides.${name}`)};
  `
}

export default override
