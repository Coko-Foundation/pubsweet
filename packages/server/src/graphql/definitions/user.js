const resolvers = {
  Query: {
    user(_, { id }, ctx) {
      return ctx.connectors.User.fetchOne(id, ctx)
    },
    users(_, vars, ctx) {
      return ctx.connectors.User.fetchAll(ctx)
    },
  },
  Mutation: {
    createUser(_, { input }, ctx) {
      return ctx.connectors.User.create(input, ctx)
    },
    deleteUser(_, { id }, ctx) {
      return ctx.connectors.User.delete(id, ctx)
    },
    updateUser(_, { id, input }, ctx) {
      return ctx.connectors.User.update(id, input, ctx)
    },
  },
  User: {
    teams(user, vars, ctx) {
      return ctx.connectors.Team.fetchSome(user.teams, ctx)
    },
    fragments(user, vars, ctx) {
      return ctx.connectors.Fragment.fetchSome(user.fragments, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    user(id: ID): User
    users: [User]
  }

  extend type Mutation {
    createUser(input: UserInput): User
    deleteUser(id: ID): User
    updateUser(id: ID, input: UserInput): User
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
  }

  input UserInput {
    username: String!
    email: String!
    password: String
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
