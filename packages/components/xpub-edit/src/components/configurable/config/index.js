import { Schema } from 'prosemirror-model'
import { addListNodes } from 'prosemirror-schema-list'
import { schema as defaultSchema } from 'prosemirror-schema-basic'

import pick from 'lodash/pick'
import map from 'lodash/map'

import makePlugins from './plugins'
import menuItems from './menu'
// import nodes from './nodes'
import marks from './marks'

export default features => {
  const featureNames = Object.keys(features).filter(key => features[key])

  const schema = new Schema({
    nodes: addListNodes(defaultSchema.spec.nodes, 'paragraph block*', 'block'),
    marks: pick(marks, featureNames),
    // nodes: {
    //   ...pick(nodes, ['doc', 'paragraph', 'text']),
    //   ...pick(nodes, featureNames),
    // },
  })

  const enabledMenuItems = pick(menuItems, featureNames)
  const menu = map(enabledMenuItems, (itemCreator, featureName) => {
    const menuItem = itemCreator(schema)
    const feature = features[featureName]
    if (typeof feature === 'object' && feature.icon) {
      menuItem.content = feature.icon
    }
    return menuItem
  })
  const plugins = makePlugins(schema, featureNames)

  return {
    schema,
    plugins,
    menu,
  }
}
