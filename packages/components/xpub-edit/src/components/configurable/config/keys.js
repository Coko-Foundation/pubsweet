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

const makeKeymap = (schema, features) => {
  const keys = {
    Backspace: undoInputRule,
    'Ctrl-Enter': exitCode,
    Escape: selectParentNode,
    'Mod-Enter': exitCode,
    'Shift-Enter': exitCode,
    'Mod-z': undo,
    'Mod-y': redo,
    'Shift-Mod-z': redo,
    'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
  }

  if (features.includes('bold')) {
    keys['Mod-b'] = toggleMark(schema.marks.bold)
  }
  if (features.includes('italic')) {
    keys['Mod-i'] = toggleMark(schema.marks.italic)
  }
  if (features.includes('heading')) {
    keys['Shift-Ctrl-1'] = setBlockType(schema.nodes.heading, { level: 1 })
  }

  Object.keys(baseKeymap).forEach(key => {
    if (keys[key]) {
      keys[key] = chainCommands(keys[key], baseKeymap[key])
    } else {
      keys[key] = baseKeymap[key]
    }
  })

  return keymap(keys)
}

export default makeKeymap
