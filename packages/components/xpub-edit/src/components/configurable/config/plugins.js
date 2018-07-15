import { history } from 'prosemirror-history'
import { tableEditing, columnResizing } from 'prosemirror-tables'
import makeKeymap from './keys'

export default (schema, features) => [
  makeKeymap(schema, features),
  history(),
  tableEditing(),
  columnResizing(),
]
