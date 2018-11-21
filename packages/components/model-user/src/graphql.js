const authentication = require('./authentication')
const logger = require('@pubsweet/logger')
const User = require('./user')

const resolvers = {
  Query: {
    user(_, { id }, ctx) {
      return ctx.connectors.User.fetchOne(id, ctx)
    },
    users(_, vars, ctx) {
      return ctx.connectors.User.fetchAll(ctx)
    },
    // Authentication
    currentUser(_, vars, ctx) {
      if (!ctx.user) return null
      return User.find(ctx.user)
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
    // Authentication
    async loginUser(_, { input }) {
      let isValid = false
      let user
      try {
        user = await User.findByUsername(input.username)
        isValid = await user.validPassword(input.password)
      } catch (err) {
        logger.debug(err)
      }
      if (!isValid) {
        throw new Error('Wrong username or password.')
      }
      return {
        user,
        token: authentication.token.create(user),
      }
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

  # Authentication

  extend type Query {
    # Get the currently authenticated user based on the JWT in the HTTP headers
    currentUser: User
  }

  extend type Mutation {
    # Authenticate a user using username and password
    loginUser(input: LoginUserInput): LoginResult
  }

  # User details and bearer token
  type LoginResult {
    user: User!
    token: String!
  }

  input LoginUserInput {
    username: String!
    password: String!
  }
`

module.exports = { resolvers, typeDefs }
