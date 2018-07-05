import { setBlockType, toggleMark, joinUp, lift } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { wrapInList } from 'prosemirror-schema-list'

import icons from './icons'

const markActive = type => state => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection

  if (node) {
    return node.hasMarkup(type, attrs)
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs)
}

const promptForURL = () => {
  let url = window.prompt('Enter the URL', 'https://')

  if (url && !/^https?:\/\//i.test(url)) {
    url = `http://${url}`
  }

  return url
}

export default {
  orderedlist: schema => ({
    content: 'ordered list',
    run: wrapInList(schema.nodes.ordered_list, { order: { default: 1 } }),
    title: 'Toggle ordered List',
    select: state => wrapInList(state),
  }),
  bulletlist: schema => ({
    content: 'bullet list',
    run: wrapInList(schema.nodes.bullet_list, {}),
    title: 'Toggle bullet List',
    select: state => wrapInList(state),
  }),
  joinaboveblock: schema => ({
    content: 'join',
    run: joinUp,
    select: state => joinUp(state),
    title: 'join wtih above block',
  }),
  liftitem: schema => ({
    content: 'lift',
    run: lift,
    select: state => lift(state),
    title: 'lift item',
  }),
  bold: schema => ({
    active: markActive(schema.marks.bold),
    content: icons.bold,
    run: toggleMark(schema.marks.bold),
    title: 'Toggle bold',
    select: state => true,
  }),
  italic: schema => ({
    active: markActive(schema.marks.italic),
    content: icons.italic,
    run: toggleMark(schema.marks.italic),
    title: 'Toggle italic',
  }),
  underline: schema => ({
    active: markActive(schema.marks.underline),
    content: icons.underline,
    run: toggleMark(schema.marks.underline),
    title: 'Toggle underline',
    select: state => true,
  }),
  link: schema => ({
    title: 'Add or remove link',
    content: icons.link,
    active: markActive(schema.marks.link),
    select: state => true,
    enable: state => !state.selection.empty,
    run: (state, dispatch) => {
      if (markActive(schema.marks.link)(state)) {
        toggleMark(schema.marks.link)(state, dispatch)
        return true
      }

      const href = promptForURL()
      if (!href) return false

      toggleMark(schema.marks.link, { href })(state, dispatch)
      // view.focus()
      return true
    },
  }),
  smallcaps: schema => ({
    active: markActive(schema.marks.smallcaps),
    content: icons.smallcaps,
    select: state => true,
    run: toggleMark(schema.marks.smallcaps),
    title: 'Toggle small caps',
  }),
  subscript: schema => ({
    active: markActive(schema.marks.subscript),
    content: icons.subscript,
    select: state => true,
    run: toggleMark(schema.marks.subscript),
    title: 'Toggle subscript',
  }),
  superscript: schema => ({
    active: markActive(schema.marks.superscript),
    content: icons.superscript,
    select: state => true,
    run: toggleMark(schema.marks.superscript),
    title: 'Toggle superscript',
  }),
  heading: schema => ({
    active: blockActive(schema.nodes.heading, { level: 1 }),
    content: icons.heading,
    select: state => true,
    run: (state, dispatch) => {
      if (blockActive(schema.nodes.heading)(state)) {
        setBlockType(schema.nodes.paragraph)(state, dispatch)
        return true
      }

      setBlockType(schema.nodes.heading, { level: 1 })(state, dispatch)
      return undefined
    },
    title: 'Toggle section title',
  }),
  redo: () => ({
    content: icons.redo,
    enable: redo,
    run: redo,
    select: state => true,
    title: 'Redo last undone change',
  }),
  undo: () => ({
    content: icons.undo,
    enable: undo,
    run: undo,
    select: state => true,
    title: 'Undo last change',
  }),
}
