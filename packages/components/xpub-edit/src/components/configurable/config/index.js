import { Schema } from 'prosemirror-model'
import { addListNodes } from 'prosemirror-schema-list'
import { schema as defaultSchema } from 'prosemirror-schema-basic'
import { tableNodes } from 'prosemirror-tables'
import pick from 'lodash/pick'
import map from 'lodash/map'
import makePlugins from './plugins'
import menuItems from './menu'
import marks from './marks'

export default features => {
  const featureNames = Object.keys(features).filter(key => features[key])

  const schema = new Schema({
    nodes: addListNodes(
      defaultSchema.spec.nodes,
      'paragraph block*',
      'block',
    ).append(
      tableNodes({
        tableGroup: 'block',
        cellContent: 'block+',
        cellAttributes: {
          background: {
            default: null,
            getFromDOM(dom) {
              return dom.style.backgroundColor || null
            },
            setDOMAttr(value, attrs) {
              if (value)
                attrs.style = `${attrs.style || ''}background-color: ${value};`
            },
          },
        },
      }),
    ),
    marks: pick(marks, featureNames),
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
