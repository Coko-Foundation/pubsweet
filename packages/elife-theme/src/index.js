/* eslint-disable import/extensions */
import { injectGlobal } from 'styled-components'

import './fonts/index.css'

injectGlobal`
:root {
  /* Colors */
  --color-background: #fff;
  --color-primary: #0288d1;
  --color-secondary: #888;
  --color-furniture: #ccc;
  --color-border: #aaa;
  --color-background-hue: #f5f5f5; /* marginally darker shade of the app background so that it can be used to divide the interface when needed */
  --color-success: #629f43;
  --color-error: #b50000;
  --color-warning: #cf0c4e;
  --color-text: #212121;
  --color-text-reverse: #fff;
  --color-text-placeholder: #bdbdbd;

  /* Text variables */
  --font-interface: Georgia, serif;
  --font-heading: "Avenir Next Webfont", Arial, Helvetica, sans-serif;
  --font-reading: Georgia, serif;
  --font-writing: "Courier 10 Pitch", Courier, monospace;
  --font-size-base: 16px;
  --font-size-base-small: 13px;
  --font-size-heading-1: 36px;
  --font-size-heading-2: 26px;
  --font-size-heading-3: 22px;
  --font-size-heading-4: 20px;
  --font-size-heading-5: 18px;
  --font-size-heading-6: 16px;
  --font-line-height: 32px;

  /* Spacing */
  --grid-unit: 24px;
  --sub-grid-unit: calc(var(--grid-unit) / 4 );;

  /* Border */
  --border-radius: 3px;
  --border-width: 1px;
  --border-style: solid;

  /* Shadow (for tooltip) */
  --box-shadow: 0 2px 4px 0 rgba(51, 51, 51, 0.3);

  /* Transition */
  --transition-duration: 1s;
  --transition-duration-m: calc(var(--transition-duration) / 2 );
  --transition-duration-s: calc(var(--transition-duration) / 5 );
  --transition-duration-xs: calc(var(--transition-duration) / 10 );
  --transition-timing-function: ease-in-out;
  --transition-delay: 500ms;
}
`
