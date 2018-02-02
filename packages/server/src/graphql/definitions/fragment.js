const resolvers = {
  Query: {
    fragment(_, { id }, ctx) {
      return ctx.connectors.fragment.fetchOne(id, ctx)
    },
    fragments(ctx) {
      return ctx.connectors.fragment.fetchAll(ctx)
    },
  },
  Mutation: {
    deleteFragment(_, { id }, ctx) {
      return ctx.connectors.fragment.delete(id, ctx)
    },
    createFragment(_, { input }, ctx) {
      return ctx.connectors.fragment.create(input, ctx)
    },
  },
  Fragment: {
    owners(fragment, vars, ctx) {
      return fragment.owners
        ? ctx.connectors.user.fetchSome(fragment.owners, ctx)
        : []
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
  }
  
  type Fragment {
    id: ID!
    type: String!
    fragmentType: String
    fragments: [Fragment!]!
    owners: [User!]!
  }
  
  input FragmentInput {
    owners: [ID!]
    fragments: [ID!]
  }
`

module.exports = { resolvers, typeDefs }
