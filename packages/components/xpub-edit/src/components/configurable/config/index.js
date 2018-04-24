import { Schema } from 'prosemirror-model'
import pick from 'lodash/pick'

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

  const menu = {
    marks: Object.keys(menuItems)
      .filter(name => featureNames.includes(name))
      .reduce(
        (obj, name) => ({
          ...obj,
          [name]: menuItems[name](schema),
        }),
        {},
      ),
  }

  const plugins = makePlugins(schema, features)

  return {
    schema,
    plugins,
    menu,
  }
}
