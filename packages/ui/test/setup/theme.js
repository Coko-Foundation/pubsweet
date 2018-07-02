import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  /* Colors */
  colorBackground: 'white',
  colorPrimary: 'black',
  colorSecondary: 'grey',
  colorFurniture: 'grey',
  colorBorder: 'grey',
  colorBackgroundHue: 'grey',
  colorSuccess: 'green',
  colorError: 'red',
  colorText: 'black',
  colorTextReverse: 'white',
  colorTextPlaceholder: 'grey',

  /* Text variables */

  // fonts
  fontInterface: 'sans-serif',
  fontHeading: 'serif',
  fontReading: 'serif',
  fontWriting: 'monospace',

  // font sizes
  fontSizeBase: '18px',
  fontSizeBaseSmall: '16px',
  fontSizeHeading1: '36px',
  fontSizeHeading2: '32px',
  fontSizeHeading3: '29px',
  fontSizeHeading4: '26px',
  fontSizeHeading5: '23px',
  fontSizeHeading6: '20px',

  // line heights
  lineHeightBase: '24px',
  lineHeightBaseSmall: '24px',
  lineHeightHeading1: '40px',
  lineHeightHeading2: '40px',
  lineHeightHeading3: '32px',
  lineHeightHeading4: '32px',
  lineHeightHeading5: '24px',
  lineHeightHeading6: '24px',

  /* Spacing */
  gridUnit: '8px',

  /* Border */
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',

  /* Shadow (for tooltip) */
  boxShadow: 'none',

  /* Transition */
  transitionDuration: '1s',
  transitionDurationM: '0.5s',
  transitionDurationS: '0.2s',
  transitionDurationXs: '0.1s',
  transitionTimingFunction: 'ease',
  transitionDelay: '500ms',
}

const TestThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default TestThemeProvider
