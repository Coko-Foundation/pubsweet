const resolvers = {
  Query: {
    fragment(_, { id }, ctx) {
      return ctx.connectors.Fragment.fetchOne(id, ctx)
    },
    fragments(_, { where }, ctx) {
      return ctx.connectors.Fragment.fetchAll(where, ctx)
    },
  },
  Mutation: {
    createFragment(_, { input }, ctx) {
      return ctx.connectors.Fragment.create(input, ctx)
    },
    deleteFragment(_, { id }, ctx) {
      return ctx.connectors.Fragment.delete(id, ctx)
    },
    updateFragment(_, { id, input }, ctx) {
      return ctx.connectors.Fragment.update(id, input, ctx)
    },
  },
  Fragment: {
    owners(fragment, vars, ctx) {
      return ctx.connectors.User.fetchSome(fragment.owners, ctx)
    },
    fragments(fragment, vars, ctx) {
      return ctx.connectors.Fragment.fetchSome(fragment.fragments, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    fragment(id: ID): Fragment
    fragments: [Fragment]
  }

  extend type Mutation {
    createFragment(input: FragmentInput): Fragment
    deleteFragment(id: ID): Fragment
    updateFragment(id: ID, input: FragmentInput): Fragment
  }

  type Fragment {
    id: ID!
    rev: String
    type: String!
    fragmentType: String
    fragments: [Fragment!]!
    owners: [User!]!
  }

  input FragmentInput {
    fragmentType: String
    fragments: [ID!]
    owners: [ID!]
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
