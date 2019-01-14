const { model: Fragment } = require('@pubsweet/model-fragment')

class Blogpost extends Fragment {
  static get schema() {
    return {
      properties: {
        fragmentType: { type: 'string', const: 'blogpost' },
        source: { type: 'string' },
        kind: { type: ['string', 'null'] },
        title: { type: 'string' },
        presentation: { type: 'string' },
        published: { type: ['boolean', 'null'] },
        filtered: { type: ['string', 'null'] },
      },
    }
  }
}

Blogpost.type = 'fragment'
module.exports = Blogpost
