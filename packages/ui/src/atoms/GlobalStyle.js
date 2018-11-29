import { createGlobalStyle } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${th('colorText')};
  }
`

export default GlobalStyle
