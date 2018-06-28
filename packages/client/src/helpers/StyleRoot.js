import styled, { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { th } from '@pubsweet/ui-toolkit'

const injectGlobalStyles = () => injectGlobal`
  ${styledNormalize}
`

const StyleRoot = styled.div`
  background-color: ${th('colorBackground')};
  font-family: ${th('fontInterface')}, sans-serif;
  font-size: ${th('fontSizeBase')};
  color: ${th('colorText')};
  line-height: ${th('lineHeightBase')};

  * {
    box-sizing: border-box;
  }
`

export default StyleRoot
export { injectGlobalStyles }
