const logger = require('@pubsweet/logger')
const { AuthorizationError, ConflictError } = require('@pubsweet/errors')

// const eager = 'teams.members.[user, alias]'
const eager = undefined

const resolvers = {
  Query: {
    user(_, { id }, ctx) {
      return ctx.connectors.User.fetchOne(id, ctx, { eager })
    },
    users(_, { where }, ctx) {
      return ctx.connectors.User.fetchAll(where, ctx, { eager })
    },
    // Authentication
    currentUser(_, vars, ctx) {
      if (!ctx.user) return null
      return ctx.connectors.User.model.find(ctx.user, { eager })
    },
  },
  Mutation: {
    async createUser(_, { input }, ctx) {
      if (input.password) {
        input.passwordHash = await ctx.connectors.User.model.hashPassword(
          input.password,
        )
        delete input.password
      }

      try {
        const user = await ctx.connectors.User.create(input, ctx)
        return user
      } catch (e) {
        if (e.constraint) {
          throw new ConflictError(
            'User with this username or email already exists',
          )
        } else {
          throw e
        }
      }
    },
    deleteUser(_, { id }, ctx) {
      return ctx.connectors.User.delete(id, ctx)
    },
    async updateUser(_, { id, input }, ctx) {
      if (input.password) {
        input.passwordHash = await ctx.connectors.User.model.hashPassword(
          input.password,
        )
        delete input.password
      }

      return ctx.connectors.User.update(id, input, ctx)
    },
    // Authentication
    async loginUser(_, { input }, ctx) {
      const authentication = require('pubsweet-server/src/authentication')

      let isValid = false
      let user
      try {
        user = await ctx.connectors.User.model.findByUsername(input.username)
        isValid = await user.validPassword(input.password)
      } catch (err) {
        logger.debug(err)
      }
      if (!isValid) {
        throw new AuthorizationError('Wrong username or password.')
      }
      return {
        user,
        token: authentication.token.create(user),
      }
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
    type: String
    username: String
    email: String
    admin: Boolean
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
