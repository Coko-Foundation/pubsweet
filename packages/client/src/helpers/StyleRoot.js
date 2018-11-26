import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

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
