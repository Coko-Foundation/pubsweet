const italic = {
  parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
  toDOM: () => ['i'],
}

const subscript = {
  parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
  toDOM: () => ['sub'],
}

const superscript = {
  parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
  toDOM: () => ['sup'],
}
// eslint-disable-next-line camelcase
const small_caps = {
  parseDOM: [{ style: 'font-variant=small-caps' }],
  toDOM: () => ['span', { style: 'font-variant:small-caps' }],
}

export default {
  italic,
  small_caps,
  subscript,
  superscript,
}
