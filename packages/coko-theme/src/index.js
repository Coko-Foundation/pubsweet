/* eslint-disable import/extensions */
import 'typeface-fira-sans-condensed'
import 'typeface-vollkorn'

import { headingScale } from '@pubsweet/ui-toolkit'

import { injectGlobal } from 'styled-components'

import { Action, ActionGroup, AppBar, Button, TextField } from './elements'

const fontSizeBase = 16
const scale = 1.2
const gridUnit = 24

injectGlobal`
  body {
    height: 100vh;
  }

  #root, #root > div {
    height: 100%;
  }
`

const cokoTheme = {
  /* Colors */
  colorBackground: 'white',
  colorPrimary: '#0B65CB',
  colorSecondary: '#E7E7E7',
  colorFurniture: '#CCC',
  colorBorder: '#AAA',
  colorBackgroundHue: '#F1F1F1',
  colorSuccess: '#008800',
  colorError: '#FF2D1A',
  colorText: '#111',
  colorTextReverse: '#FFF',
  colorTextPlaceholder: '#595959',
  colorWarning: '#ffc107',

  // TODO -- not used anywhere
  //   $colorInteract: var($colorPrimaryDarker);
  // $colorPrimaryDarker: #0551a8

  /* Text variables */
  fontInterface: "'Fira Sans Condensed'",
  fontHeading: "'Fira Sans Condensed'",
  fontReading: "'Vollkorn'",
  fontWriting: "'Cokourier Prime Sans'",
  fontSizeBase: `${fontSizeBase}px`,
  fontSizeBaseSmall: '14px',
  fontSizeHeading1: `${headingScale(fontSizeBase, scale, 1)}px`,
  fontSizeHeading2: `${headingScale(fontSizeBase, scale, 2)}px`,
  fontSizeHeading3: `${headingScale(fontSizeBase, scale, 3)}px`,
  fontSizeHeading4: `${headingScale(fontSizeBase, scale, 4)}px`,
  fontSizeHeading5: `${headingScale(fontSizeBase, scale, 5)}px`,
  fontSizeHeading6: `${headingScale(fontSizeBase, scale, 6)}px`,
  fontLineHeight: '24px',

  /* Spacing */
  gridUnit: `${gridUnit}px`,
  subGridUnit: '6px',

  /* Border */
  borderRadius: '0',
  borderWidth: '1px', // julien: not 0
  borderStyle: 'solid',

  // Does not exist
  // $borderColor: var($colorFurniture);

  /* Shadow (for tooltip) */
  boxShadow: '0 2px 4px 0 rgba(51, 51, 51, 0.3)',

  /* Transition */
  transitionDuration: '0.2s', // TODO -- julien: not 0.05s
  transitionTimingFunction: 'ease',
  transitionDelay: '0',

  cssOverrides: {
    ui: {
      Action,
      ActionGroup,
      AppBar,
      Button,
      TextField,
    },
  },
}

// console.log(cokoTheme)

export default cokoTheme
