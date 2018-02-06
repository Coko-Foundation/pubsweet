/* eslint-disable import/extensions */
import { injectGlobal } from 'styled-components'

import 'typeface-noto-sans'
import 'typeface-noto-serif'
import 'typeface-ubuntu-mono'

injectGlobal`
:root {
  /* Colors */
  --color-background: white;
  --color-primary: #205d86;
  --color-secondary: #e7e7e7;
  --color-furniture: #ccc;
  --color-border: #aaa;
  --color-background-hue: #f1f1f1; /* marginally darker shade of the app background so that it can be used to divide the interface when needed */
  --color-success: #050;
  --color-error: #b50000;
  --color-text: #333;
  --color-text-reverse: #fff;
  --color-text-placeholder: #595959;

  /* Text variables */
  --font-interface: 'Noto Sans';
  --font-heading: 'Noto Sans';
  --font-reading: 'Noto Serif';
  --font-writing: 'Ubuntu mono';
  --font-size-base: 18px;
  --font-size-base-small: 16px;
  --font-size-heading-1: 36px;
  --font-size-heading-2: 32px;
  --font-size-heading-3: 29px;
  --font-size-heading-4: 26px;
  --font-size-heading-5: 23px;
  --font-size-heading-6: 20px;
  --font-line-height: 32px;

  /* Spacing */
  --grid-unit: 32px;
  --sub-grid-unit: calc(var(--grid-unit) / 4 );;

  /* Border */
  --border-radius: 8px;
  --border-width: 1px;
  --border-style: solid;

  /* Shadow (for tooltip) */
  --box-shadow: 0 2px 4px 0 rgba(51, 51, 51, 0.3);

  /* Transition */
  --transition-duration: 2s;
  --transition-duration-unit: calc(var(--transition-duration) / 10 );
  --transition-timing-function: ease;
  --transition-delay: 500ms;
}
`
