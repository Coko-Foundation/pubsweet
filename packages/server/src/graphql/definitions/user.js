const resolvers = {
  Query: {
    user(_, { id }, ctx) {
      return ctx.connectors.user.fetchOne(id, ctx)
    },
    users(_, vars, ctx) {
      return ctx.connectors.user.fetchAll(ctx)
    },
  },
  Mutation: {
    createUser(_, { input }, ctx) {
      return ctx.connectors.user.create(input, ctx)
    },
    deleteUser(_, { id }, ctx) {
      return ctx.connectors.user.delete(id, ctx)
    },
    updateUser(_, { id, input }, ctx) {
      return ctx.connectors.user.update(id, input, ctx)
    },
  },
  User: {
    collections(user, vars, ctx) {
      return ctx.connectors.collection.fetchSome(user.collections, ctx)
    },
    teams(user, vars, ctx) {
      return ctx.connectors.team.fetchSome(user.teams, ctx)
    },
    fragments(user, vars, ctx) {
      return ctx.connectors.fragment.fetchSome(user.fragments, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    user(id: ID): User
    users: [User]
  }
  
  extend type Mutation {
    createUser(input: String): User
    deleteUser(id: ID): User 
    updateUser(id: ID, input: String): User 
  }
  
  type User {
    id: ID!
    rev: String
    type: String
    username: String!
    email: String!
    admin: Boolean
    teams: [Team!]!
    fragments: [Fragment!]!
    collections: [Collection!]!
  }
  
  input UserInput {
    username: String!
    email: String!
    password: String
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
