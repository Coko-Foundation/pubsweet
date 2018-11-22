const resolvers = {
  Query: {
    team(_, { id }, ctx) {
      return ctx.connectors.Team.fetchOne(id, ctx)
    },
    teams(_, vars, ctx) {
      return ctx.connectors.Team.fetchAll(ctx)
    },
  },
  Mutation: {
    deleteTeam(_, { id }, ctx) {
      return ctx.connectors.Team.delete(id, ctx)
    },
    createTeam(_, { input }, ctx) {
      return ctx.connectors.Team.create(input, ctx)
    },
    updateTeam(_, { id, input }, ctx) {
      return ctx.connectors.Team.update(id, input, ctx)
    },
  },
  Team: {
    members(team, vars, ctx) {
      return ctx.connectors.User.fetchSome(team.members, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    team(id: ID): Team
    teams: [Team]
  }

  extend type Mutation {
    createTeam(input: TeamInput): Team
    deleteTeam(id: ID): Team
    updateTeam(id: ID, input: TeamInput): Team
  }

  type Team {
    id: ID!
    rev: String
    type: String!
    teamType: String!
    name: String!
    object: TeamObject
    members: [User!]!
    owners: [User]
    global: Boolean
  }

  type TeamObject {
    objectId: ID!
    objectType: String!
  }

  input TeamInput {
    teamType: String
    name: String
    object: TeamObjectInput
    members: [ID!]
    rev: String
    global: Boolean

  }

  input TeamObjectInput {
    objectId: ID!
    objectType: String!
  }
`

module.exports = { resolvers, typeDefs }
