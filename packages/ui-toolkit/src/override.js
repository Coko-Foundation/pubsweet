/*
  Helper to write overrides for your styled components.

  This is here so that you don't have to think about compatibility between this:

  cssOverrides.ui.Button = css``

  and this:

  cssOverrides.ui.Button = {
    Root: css``,
    Input: css``
  }

  in your theme.

  -------------------

  Usage:

  const Button = styled.div`
    YOUR CSS HERE

    ${override('ui.Button')};
  `

  Now both of the above scenarios will work.
*/

import { css } from 'styled-components'
import { get, has } from 'lodash'

import th from './themeHelper'

/*
  Will be using ui.Button as an example component override to explain the code.
*/
const override = (name, overrideKey = 'cssOverrides') => props => {
  // Find (props.theme.cssOverrides.) ui.Button
  const target = get(props.theme[overrideKey], name)

  // ui.Button is not there.
  if (!target) return null

  // css`` functions from styled components come in as arrays
  const isStyledCss = Array.isArray(target)
  const hasRoot = has(target, 'Root')

  /*
    ui.Button is there, but there is no ui.Button.Root or ui.Button: css``.

    This also covers the case where you only target children of the component,
    eg. if your override looks like ui.Button = { Icon: css`` }.
    In this case, there would be no overrides for ui.Button, but only for
    ui.Button.Icon, which would have its own override.
  */
  if (!isStyledCss && !hasRoot) return null

  // ui.Button.Root exists
  if (hasRoot) {
    return css`
      ${th(`${overrideKey}.${name}.Root`)};
    `
  }

  // ui.Button: css`` exists
  return css`
    ${th(`${overrideKey}.${name}`)};
  `
}

export default override
