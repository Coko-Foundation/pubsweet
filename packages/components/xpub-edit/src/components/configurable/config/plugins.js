import { history } from 'prosemirror-history'
import { tableEditing, columnResizing } from 'prosemirror-tables'

import makeKeymap from './keys'
import placeholderPlugin from './PlaceHolderPlugin'

export default (schema, features) => [
  makeKeymap(schema, features),
  columnResizing(),
  history(),
  placeholderPlugin,
  tableEditing(),
]
