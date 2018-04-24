import { Schema } from 'prosemirror-model'
import pick from 'lodash/pick'
import map from 'lodash/map'

import makePlugins from './plugins'
import menuItems from './menu'
import nodes from './nodes'
import marks from './marks'

export default features => {
  const featureNames = Object.keys(features)

  const schema = new Schema({
    marks: pick(marks, featureNames),
    nodes: {
      ...pick(nodes, ['doc', 'paragraph', 'text']),
      ...pick(nodes, featureNames),
    },
  })

  const enabledMenuItems = pick(menuItems, featureNames)
  const menu = map(enabledMenuItems, itemCreator => itemCreator(schema))
  const plugins = makePlugins(schema, features)

  return {
    schema,
    plugins,
    menu,
  }
}
