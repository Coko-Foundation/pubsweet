import { keymap } from 'prosemirror-keymap'
import { undoInputRule } from 'prosemirror-inputrules'
import { undo, redo } from 'prosemirror-history'
import {
  baseKeymap,
  toggleMark,
  setBlockType,
  chainCommands,
  exitCode,
  selectParentNode,
} from 'prosemirror-commands'

import schema from './schema'

const keys = {
  Backspace: undoInputRule,
  'Ctrl-Enter': exitCode,
  Escape: selectParentNode,
  'Mod-b': toggleMark(schema.marks.bold),
  'Mod-Enter': exitCode,
  'Mod-i': toggleMark(schema.marks.italic),
  'Mod-y': redo,
  'Mod-z': undo,
  'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
  'Shift-Ctrl-1': setBlockType(schema.nodes.heading, { level: 1 }),
  'Shift-Enter': exitCode,
  'Shift-Mod-z': redo,
}

Object.keys(baseKeymap).forEach(key => {
  if (keys[key]) {
    keys[key] = chainCommands(keys[key], baseKeymap[key])
  } else {
    keys[key] = baseKeymap[key]
  }
})

export default keymap(keys)