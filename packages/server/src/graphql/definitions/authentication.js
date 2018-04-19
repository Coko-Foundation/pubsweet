const logger = require('@pubsweet/logger')
const User = require('../../models/User')
const authentication = require('../../authentication')

const resolvers = {
  Query: {
    currentUser(_, vars, ctx) {
      if (!ctx.user) return null
      return User.find(ctx.user)
    },
  },
  Mutation: {
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
}

const typeDefs = `
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
