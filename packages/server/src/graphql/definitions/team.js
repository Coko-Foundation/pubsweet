const resolvers = {
  Query: {
    team(_, { id }, ctx) {
      return ctx.connectors.team.fetchOne(id, ctx)
    },
    teams(_, vars, ctx) {
      return ctx.connectors.team.fetchAll(ctx)
    },
  },
  Mutation: {
    deleteTeam(_, { id }, ctx) {
      return ctx.connectors.team.delete(id, ctx)
    },
    createTeam(_, { input }, ctx) {
      return ctx.connectors.team.create(input, ctx)
    },
    updateTeam(_, { id, input }, ctx) {
      return ctx.connectors.team.update(id, input, ctx)
    },
  },
  Team: {
    members(team, vars, ctx) {
      return ctx.connectors.user.fetchSome(team.members, ctx)
    },
  },
}

const typeDefs = `
  extend type Query {
    team(id: ID): Team
    teams: [Team]
  }
  
  extend type Mutation {
    createTeam(input: String): Team
    deleteTeam(id: ID): Team 
    updateTeam(id: ID, input: String): Team
  }
  
  type Team {
    id: ID!
    rev: String
    type: String!
    teamType: String!
    name: String!
    object: TeamObject
    members: [User!]!
  }
  
  type TeamObject {
    type: String
    id: ID!
  }
    
  input TeamInput {
    teamType: String
    name: String
    object: ID
    members: [ID!]
    rev: String
  }
`

module.exports = { resolvers, typeDefs }
