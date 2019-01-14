const { model: Collection } = require('@pubsweet/model-collection')

class Blog extends Collection {
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

Blog.type = 'collection'
module.exports = Blog
