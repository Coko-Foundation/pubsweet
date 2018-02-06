import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'

export default function injectNormalizeCSS() {
  return injectGlobal`
    ${styledNormalize}
   
    :root {
      padding: 0;
      box-sizing: border-box;
      font-family: var(--font-interface), sans-serif;
      font-size: var(--font-size-base);
      color: var(--color-text);
      line-height: var(--font-line-height);
    }
  `
}
