const { model: Collection } = require('@pubsweet/model-collection')

class ExtendedCollection extends Collection {
  static get schema() {
    return {
      properties: {
        title: { type: 'string' },
        nonPublicProperty: { type: ['string', 'null'] },
        published: { type: ['boolean', 'null'] },
        filtered: { type: ['string', 'null'] },
      },
    }
  }
}

ExtendedCollection.type = 'collection'
module.exports = ExtendedCollection
