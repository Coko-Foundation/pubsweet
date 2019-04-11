const typeDefs = `
  extend type Mutation {
    sendPasswordResetEmail(username: String!): Boolean
    resetPassword(token: String!, password: String!): ID
  }
`

module.exports = typeDefs
