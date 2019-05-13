/* eslint-disable import/extensions */
import 'typeface-noto-sans'
import 'typeface-noto-serif'
import 'typeface-ubuntu-mono'

export default {
  /* Colors */
  colorBackground: 'white',
  colorPrimary: '#205d86',
  colorSecondary: '#e7e7e7',
  colorFurniture: '#ccc',
  colorBorder: '#aaa',
  colorBackgroundHue: '#f1f1f1',
  colorSuccess: '#050',
  colorError: '#b50000',
  colorText: '#333',
  colorTextReverse: '#fff',
  colorTextPlaceholder: '#595959',
  colorWarning: '#ffc107',

  /* Text variables */

  // fonts
  fontInterface: "'Noto Sans'",
  fontHeading: "'Noto Sans'",
  fontReading: "'Noto Serif'",
  fontWriting: "'Ubuntu mono'",

  // font sizes
  fontSizeBase: '16px',
  fontSizeBaseSmall: '14px',
  fontSizeHeading1: '36px',
  fontSizeHeading2: '32px',
  fontSizeHeading3: '29px',
  fontSizeHeading4: '26px',
  fontSizeHeading5: '23px',
  fontSizeHeading6: '20px',

  // line heights
  lineHeightBase: '24px',
  lineHeightBaseSmall: '16px',
  lineHeightHeading1: '40px',
  lineHeightHeading2: '40px',
  lineHeightHeading3: '32px',
  lineHeightHeading4: '32px',
  lineHeightHeading5: '24px',
  lineHeightHeading6: '24px',

  /* Spacing */
  gridUnit: '8px',

  /* Border */
  borderRadius: '5px', // changed, needs check by designers
  borderWidth: '1px',
  borderStyle: 'solid',

  /* Shadow (for tooltip) */
  // boxShadow: '0 2px 4px 0 rgba(51, 51, 51, 0.3)',

  /* Transition */
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease',
  transitionDelay: '0',

  /* Breakpoints */
  breakpoints: [480, 768, 1000, 1272],
}
