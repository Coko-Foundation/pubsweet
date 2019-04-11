const resolvers = {
  Query: {
    collection(_, { id }, ctx) {
      return ctx.connectors.Collection.fetchOne(id, ctx)
    },
    collections(_, { where }, ctx) {
      return ctx.connectors.Collection.fetchAll(where, ctx)
    },
  },
  Mutation: {
    deleteCollection(_, { id }, ctx) {
      return ctx.connectors.Collection.delete(id, ctx)
    },
    createCollection(_, { input }, ctx) {
      return ctx.connectors.Collection.create(input, ctx)
    },
    updateCollection(_, { id, input }, ctx) {
      return ctx.connectors.Collection.update(id, input, ctx)
    },
  },
  Collection: {
    owners(collection, vars, ctx) {
      return ctx.connectors.User.fetchSome(collection.owners, ctx)
    },
    fragments(collection, vars, ctx) {
      return ctx.connectors.Fragment.fetchSome(collection.fragments, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    collection(id: ID): Collection
    collections: [Collection]
  }

  extend type Mutation {
    createCollection(input: CollectionInput): Collection
    deleteCollection(id: ID): Collection
    updateCollection(id: ID, input: CollectionInput): Collection
  }

  type Collection {
    id: ID!
    rev: String
    type: String!
    owners: [User!]!
    fragments: [Fragment!]!
  }

  input CollectionInput {
    owners: [ID!]
    fragments: [ID!]
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
