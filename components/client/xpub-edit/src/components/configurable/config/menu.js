import React from 'react'
import { Fragment } from 'prosemirror-model'
import { TextSelection } from 'prosemirror-state'
import { setBlockType, toggleMark, joinUp, lift } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { wrapInList } from 'prosemirror-schema-list'
import { addColumnBefore } from 'prosemirror-tables'
import icons from './icons'
import MenuButton from '../../MenuButton'
import DropDownTable from '../../DropDownTable'
import UploadImage from '../../UploadImage'

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

const createTable = (row = 1, col = 1, cellAttrs = {}) => (state, dispatch) => {
  const { tr, schema } = state
  const tableType = schema.nodes.table
  const rowType = schema.nodes.table_row
  const cellType = schema.nodes.table_cell
  const cellNode = cellType.createAndFill(cellAttrs)
  const cells = []
  for (let i = 0; i < col; i += 1) cells.push(cellNode)
  const rowNode = rowType.create(null, Fragment.from(cells))
  const rows = []
  for (let i = 0; i < row; i += 1) rows.push(rowNode)
  const tableNode = tableType.create(null, Fragment.from(rows))
  const newSelection = TextSelection.create(tr.doc, 1)
  if (dispatch) {
    dispatch(
      tr
        .replaceSelectionWith(tableNode)
        .setSelection(newSelection)
        .scrollIntoView(),
    )
  }
  return true
}

export default {
  table: schema => ({
    content: 'table',
    run: option => true,
    title: '',
    select: state => addColumnBefore(state),
    menu: props => <DropDownTable {...props} />,
  }),
  createtable: schema => ({
    content: 'create table',
    run: createTable(2, 2),
    title: 'Create a new table',
    select: state => true,
    menu: props => <MenuButton {...props} />,
  }),
  insertimage: schema => ({
    content: 'upload image',
    run: option => true,
    title: 'Upload an image',
    select: state => true,
    menu: props => <UploadImage {...props} />,
  }),
  orderedlist: schema => ({
    content: 'ordered list',
    run: wrapInList(schema.nodes.ordered_list, { order: { default: 1 } }),
    title: 'Toggle ordered List',
    select: state => wrapInList(state),
    menu: props => <MenuButton {...props} />,
  }),
  bulletlist: schema => ({
    content: 'bullet list',
    run: wrapInList(schema.nodes.bullet_list, {}),
    title: 'Toggle bullet List',
    select: state => wrapInList(state),
    menu: props => <MenuButton {...props} />,
  }),
  joinaboveblock: schema => ({
    content: 'join',
    run: joinUp,
    select: state => joinUp(state),
    title: 'Join with above block',
    menu: props => <MenuButton {...props} />,
  }),
  liftitem: schema => ({
    content: 'lift',
    run: lift,
    select: state => lift(state),
    title: 'Lift item',
    menu: props => <MenuButton {...props} />,
  }),
  bold: schema => ({
    active: markActive(schema.marks.bold),
    content: icons.bold,
    run: toggleMark(schema.marks.bold),
    title: 'Toggle bold',
    select: state => true,
    menu: props => <MenuButton {...props} />,
  }),
  italic: schema => ({
    active: markActive(schema.marks.italic),
    content: icons.italic,
    run: toggleMark(schema.marks.italic),
    title: 'Toggle italic',
    select: state => true,
    menu: props => <MenuButton {...props} />,
  }),
  underline: schema => ({
    active: markActive(schema.marks.underline),
    content: icons.underline,
    run: toggleMark(schema.marks.underline),
    title: 'Toggle underline',
    select: state => true,
    menu: props => <MenuButton {...props} />,
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
    menu: props => <MenuButton {...props} />,
  }),
  smallcaps: schema => ({
    active: markActive(schema.marks.smallcaps),
    content: icons.smallcaps,
    select: state => true,
    run: toggleMark(schema.marks.smallcaps),
    title: 'Toggle small caps',
    menu: props => <MenuButton {...props} />,
  }),
  subscript: schema => ({
    active: markActive(schema.marks.subscript),
    content: icons.subscript,
    select: state => true,
    run: toggleMark(schema.marks.subscript),
    title: 'Toggle subscript',
    menu: props => <MenuButton {...props} />,
  }),
  superscript: schema => ({
    active: markActive(schema.marks.superscript),
    content: icons.superscript,
    select: state => true,
    run: toggleMark(schema.marks.superscript),
    title: 'Toggle superscript',
    menu: props => <MenuButton {...props} />,
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
    menu: props => <MenuButton {...props} />,
  }),
  redo: () => ({
    content: icons.redo,
    enable: redo,
    run: redo,
    select: state => true,
    title: 'Redo last undone change',
    menu: props => <MenuButton {...props} />,
  }),
  undo: () => ({
    content: icons.undo,
    enable: undo,
    run: undo,
    select: state => true,
    title: 'Undo last change',
    menu: props => <MenuButton {...props} />,
  }),
}
