const resolvers = {
  Query: {
    collection(_, { id }, ctx) {
      return ctx.connectors.collection.fetchOne(id, ctx)
    },
    collections(_, { id }, ctx) {
      return ctx.connectors.collection.fetchAll(ctx)
    },
  },
  Mutation: {
    deleteCollection(_, { id }, ctx) {
      return ctx.connectors.collection.delete(id, ctx)
    },
    createCollection(_, { input }, ctx) {
      return ctx.connectors.collection.create(input, ctx)
    },
    updateCollection(_, { id, input }, ctx) {
      return ctx.connectors.collection.update(id, input, ctx)
    },
  },
  Collection: {
    fragments(collection, vars, ctx) {
      return ctx.connectors.fragment.fetchSome(collection.fragments, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    collection(id: ID): Collection
    collections: [Collection]
  }

  extend type Mutation {
    createCollection(input: String): Collection
    deleteCollection(id: ID): Collection
    updateCollection(id: ID, input: String): Collection
  }

  type Collection {
    id: ID!
    rev: String
    type: String!
    fragments: [Fragment!]!
  }

  input CollectionInput {
    fragments: [ID!]
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
