const Manuscript = require('../manuscript')
const { helpers: { filterAll, can, canKnowAbout } } = require('pubsweet-server')

const resolvers = {
  Query: {
    manuscriptByDOI(_, { doi }, ctx) {
      return Manuscript.findOneByField('doi', doi)
    },

    async publishedManuscripts(_, __, ctx) {
      const manuscripts = await Manuscript.findByField('published', true)
      return filterAll(ctx.user, manuscripts)
    },
  },
  Mutation: {
    async publishManuscript(_, { id, input }, ctx) {
      const manuscript = await Manuscript.find(id)

      const outputFilter = await canKnowAbout(ctx.user, manuscript)
      const currentAndUpdate = {
        current: manuscript,
        update: input,
      }
      const updateFilter = await can(
        ctx.user,
        'publishManuscript',
        currentAndUpdate,
      )
      await manuscript.updateProperties(updateFilter(input))
      return outputFilter(await manuscript.save())
    },
  },
}

const typeDefs = `
  extend type Query {
    manuscriptByDOI(doi: String): Manuscript
    publishedManuscripts: [Manuscript]
  }

  extend type Mutation {
    publishManuscript(id: ID, input: PublishManuscriptInput): Manuscript
  }

  extend type Manuscript {
    published: Boolean
    doi: String
    approvedByAuthor: Boolean
  }

  extend input ManuscriptInput {
    published: Boolean
    doi: String
  }

  input PublishManuscriptInput {
    published: Boolean
    approvedByAuthor: Boolean
  }
`

module.exports = { resolvers, typeDefs }
