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

import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list'

import { goToNextCell } from 'prosemirror-tables'

const makeKeymap = (schema, features) => {
  const bind = (key, cmd) => {
    if (features) {
      const mapped = features[key]
      if (mapped === false) return
      if (mapped) key = mapped
    }
    keys[key] = cmd
  }

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
    'Shift-Ctrl-9': wrapInList(schema.nodes.ordered_list),
    'Shift-Ctrl-8': wrapInList(schema.nodes.bullet_list),
    Tab: goToNextCell(1),
    'Shift-Tab': goToNextCell(-1),
  }

  const type = schema.nodes.list_item

  if (type) {
    bind('Enter', splitListItem(type))
    bind('Mod-[', liftListItem(type))
    bind('Mod-]', sinkListItem(type))
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
