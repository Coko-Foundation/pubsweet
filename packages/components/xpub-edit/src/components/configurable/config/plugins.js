import { history } from 'prosemirror-history'
import makeKeymap from './keys'

export default (schema, features) => [makeKeymap(schema, features), history()]
