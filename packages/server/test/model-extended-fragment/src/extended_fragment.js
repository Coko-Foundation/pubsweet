const { model: Fragment } = require('@pubsweet/model-fragment')

class ExtendedFragment extends Fragment {
  static get schema() {
    return {
      required: ['fragmentType'],
      anyOf: [
        {
          type: 'object',
          properties: {
            fragmentType: { type: 'string', const: 'blogpost' },
            source: { type: 'string' },
            kind: { type: ['string', 'null'] },
            title: { type: 'string' },
            presentation: { type: 'string' },
            published: { type: ['boolean', 'null'] },
            filtered: { type: 'string' },
          },
        },
        {
          type: 'object',
          properties: {
            fragmentType: { type: 'string', const: 'file' },
            path: { type: 'string' },
          },
        },
      ],
    }
  }
}

ExtendedFragment.type = 'fragment'
module.exports = ExtendedFragment
