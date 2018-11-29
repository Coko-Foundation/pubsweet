import { createGlobalStyle } from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${th('colorText')};
  }
  ${override('ui.GlobalStyle')};
`

export default GlobalStyle
