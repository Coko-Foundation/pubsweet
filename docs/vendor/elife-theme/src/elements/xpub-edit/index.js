import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

export const MenuBar = {
  Wrapper: css`
    border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
    border-radius: ${th('borderRadius')} ${th('borderRadius')} 0 0;
    background-color: ${th('colorBackgroundHue')};
    margin-bottom: 0;
    border-bottom: none;
    line-height: calc(${th('gridUnit')} * 2);
    padding: ${th('gridUnit')};
  `,
}

export const MenuButton = {
  Button: css`
    background-color: transparent;
    margin: ${th('gridUnit')}
    width: calc(${th('gridUnit')} * 4);
    /* subtract border width */
    height: calc((${th('gridUnit')} * 4) - 2px);
  `,
}

export const Editor = css`
  border-radius: 0 0 ${th('borderRadius')} ${th('borderRadius')};
`
