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
  },
  Team: {
    members(team, vars, ctx) {
      return team.members
        ? ctx.connectors.user.fetchSome(team.members, ctx)
        : []
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
  }
  
  type Team {
    id: ID!
    type: String!
    teamType: String!
    name: String!
    object: ID!
    members: [User!]!
  }
  
  input TeamInput {
    owners: [ID!]
    fragments: [ID!]
  }
`

module.exports = { resolvers, typeDefs }
