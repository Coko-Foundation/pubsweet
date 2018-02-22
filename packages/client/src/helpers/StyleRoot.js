import styled, { injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

const injectGlobalStyles = () => injectGlobal`
  ${styledNormalize}
`

const StyleRoot = styled.div`
  background-color: ${props => props.theme.colorBackground};
  font-family: ${props => props.theme.fontInterface}, sans-serif;
  font-size: ${props => props.theme.fontSizeBase};
  color: ${props => props.theme.colorText};
  line-height: ${props => props.theme.fontLineHeight};

  * {
    box-sizing: border-box;
  }
`

export default StyleRoot
export { injectGlobalStyles }
