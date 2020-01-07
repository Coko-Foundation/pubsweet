const resolvers = {
  Query: {
    manuscript(_, { id }, ctx) {
      return ctx.loaders.Manuscript.load(id)
    },
    manuscripts(_, { where }, ctx) {
      return ctx.connectors.Manuscript.fetchAll(where, ctx)
    },
  },
  Mutation: {
    deleteManuscript(_, { id }, ctx) {
      return ctx.connectors.Manuscript.delete(id, ctx)
    },
    createManuscript(_, { input }, ctx) {
      return ctx.connectors.Manuscript.create(input, ctx)
    },
    updateManuscript(_, { id, input }, ctx) {
      return ctx.connectors.Manuscript.update(id, input, ctx)
    },
  },
  Manuscript: {
    owners(manuscript, vars, ctx) {
      return ctx.connectors.User.fetchSome(manuscript.owners, ctx)
    },
    fragments(manuscript, vars, ctx) {
      return ctx.connectors.Fragment.fetchSome(manuscript.fragments, ctx)
    },
  },
  User: {
    manuscripts(user, vars, ctx) {
      return ctx.connectors.Manuscript.fetchSome(user.manuscripts, ctx)
    },
  },
}

const typeDefs = `
  extend type User {
    manuscripts: [Manuscript!]!
  }

  extend type Query {
    manuscript(id: ID): Manuscript
    manuscripts: [Manuscript]
  }

  extend type Mutation {
    createManuscript(input: ManuscriptInput): Manuscript
    deleteManuscript(id: ID): Manuscript
    updateManuscript(id: ID, input: ManuscriptInput): Manuscript
  }

  type Manuscript {
    id: ID!
    rev: String
    type: String!
    owners: [User!]!
    title: String!
    fragments: [Fragment!]!
  }

  input ManuscriptInput {
    owners: [ID!]
    fragments: [ID!]
    rev: String
    title: String
  }
`

module.exports = { resolvers, typeDefs }
