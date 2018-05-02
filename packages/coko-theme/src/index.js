/* eslint-disable import/extensions */
import 'typeface-fira-sans-condensed'
import 'typeface-vollkorn'

import { Action, ActionGroup, AppBar, Button, TextField } from './elements'

// LEAVE THESE HERE, they're useful for easy switching to the default theme
// import theme from '@pubsweet/default-theme'
// export default theme

// TODO -- where should functions like this exist?
const scaleFn = (base, scale, heading) => base * scale ** Math.abs(heading - 6)

const fontSizeBase = 16
const scale = 1.2
const gridUnit = 24

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
  fontSizeHeading1: `${scaleFn(fontSizeBase, scale, 1)}px`,
  fontSizeHeading2: `${scaleFn(fontSizeBase, scale, 2)}px`,
  fontSizeHeading3: `${scaleFn(fontSizeBase, scale, 3)}px`,
  fontSizeHeading4: `${scaleFn(fontSizeBase, scale, 4)}px`,
  fontSizeHeading5: `${scaleFn(fontSizeBase, scale, 5)}px`,
  fontSizeHeading6: `${scaleFn(fontSizeBase, scale, 6)}px`,
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
    Action,
    ActionGroup,
    AppBar,
    Button,
    TextField,
  },
}

// console.log(cokoTheme)

export default cokoTheme
