const resolvers = {
  Query: {
    collection(_, { id }, ctx) {
      return ctx.connectors.collection.fetchOne(id, ctx)
    },
    collections(ctx) {
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
  },
  Collection: {
    owners(collection, vars, ctx) {
      return collection.owners
        ? ctx.connectors.user.fetchSome(collection.owners, ctx)
        : []
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
  }
  
  type Collection {
    id: ID!
    type: String!
    owners: [User!]!
    fragments: [Fragment!]!
  }
  
  input CollectionInput {
    owners: [ID!]
    fragments: [ID!]
  }
`

module.exports = { resolvers, typeDefs }
