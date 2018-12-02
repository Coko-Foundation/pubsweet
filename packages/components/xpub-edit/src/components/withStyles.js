import styled, { css } from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const contentStyles = css`
  hr {
    border: none;
    margin: 1em 0;
    padding: 2px 10px;
  }

  hr::after {
    background-color: silver;
    content: '';
    display: block;
    height: 1px;
    line-height: 2px;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  blockquote {
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1em;
  }

  img {
    cursor: default;
  }

  th,
  td {
    border: 1px solid #eee;
    padding: 2px 5px;
  }

  p {
    margin-bottom: 0;
    margin-top: 0;
  }
`

export const withEditorStyle = Component => styled(Component).attrs({
  basePlaceholderClassName: 'placeholder',
})`
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
  line-height: 1.8;
  min-height: 1em;
  margin-bottom: calc(${th('gridUnit')} * 3);

  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  padding: ${th('gridUnit')};

  &:focus {
    outline: none;
  }

  .placeholder {
    color: ${th('colorTextPlaceholder')};
    font-family: ${th('fontInterface')};
    pointer-events: none;
  }

  &:focus .placeholder {
    display: none;
  }
  white-space: pre-wrap;

  ${contentStyles};

  ${override('xpub-edit.Editor')};
`

export const withViewerStyle = Component => styled(Component)`
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBase')};
  line-height: 1.8;
  margin-bottom: calc(${th('gridUnit')} * 3);

  ${contentStyles};
`
