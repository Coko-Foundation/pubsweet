const bold = {
  parseDOM: [
    { tag: 'strong' },
    {
      getAttrs: node => node.style.fontWeight !== 'normal' && null,
      tag: 'b',
    },
    {
      getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      style: 'font-weight',
    },
  ],
  toDOM: () => ['b'],
}

const italic = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM: () => ['i'],
}

const underline = {
  parseDOM: [{ tag: 'u' }, { style: 'font-decoration=underline' }],
  toDOM: () => ['u'],
}

const link = {
  attrs: {
    href: {},
    title: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      getAttrs: dom => ({
        href: dom.getAttribute('href'),
        title: dom.getAttribute('title'),
      }),
      tag: 'a[href]',
    },
  ],
  toDOM: node => ['a', node.attrs],
}

const smallcaps = {
  parseDOM: [{ style: 'font-variant=small-caps' }],
  toDOM: () => ['span', { style: 'font-variant:small-caps' }],
}

const subscript = {
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub'],
}

const superscript = {
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup'],
}

export default {
  bold,
  italic,
  underline,
  link,
  subscript,
  superscript,
  smallcaps,
}
