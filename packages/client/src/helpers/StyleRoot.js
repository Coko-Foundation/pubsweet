import styled, { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { theme } from '@pubsweet/ui'

const injectGlobalStyles = () => injectGlobal`
  ${styledNormalize}
`

const StyleRoot = styled.div`
  background-color: ${theme.colorBackground};
  font-family: ${theme.fontInterface}, sans-serif;
  font-size: ${theme.fontSizeBase};
  color: ${theme.colorText};
  line-height: ${theme.fontLineHeight};

  * {
    box-sizing: border-box;
  }
`

export default StyleRoot
export { injectGlobalStyles }
