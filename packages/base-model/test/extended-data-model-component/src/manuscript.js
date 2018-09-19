const { model: Manuscript } = require('../../data-model-component')

class ExtendedManuscript extends Manuscript {
  static get schema() {
    return {
      properties: {
        doi: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        published: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
        approvedByAuthor: { anyOf: [{ type: 'boolean' }, { type: 'null' }] },
      },
    }
  }
}

ExtendedManuscript.type = 'manuscript'
module.exports = ExtendedManuscript
