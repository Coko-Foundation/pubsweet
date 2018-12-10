const { model: Fragment } = require('@pubsweet/model-fragment')

class ExtendedFragment extends Fragment {
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

ExtendedFragment.type = 'fragment'
module.exports = ExtendedFragment
