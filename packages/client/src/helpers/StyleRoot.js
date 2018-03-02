import styled, { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { fromTheme } from '@pubsweet/ui'

const injectGlobalStyles = () => injectGlobal`
  ${styledNormalize}
`

const StyleRoot = styled.div`
  background-color: ${fromTheme('colorBackground')};
  font-family: ${fromTheme('fontInterface')}, sans-serif;
  font-size: ${fromTheme('fontSizeBase')};
  color: ${fromTheme('colorText')};
  line-height: ${fromTheme('fontLineHeight')};

  * {
    box-sizing: border-box;
  }
`

export default StyleRoot
export { injectGlobalStyles }
