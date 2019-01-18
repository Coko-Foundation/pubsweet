const resolvers = {
  Query: {
    team(_, { id }, ctx) {
      return ctx.connectors.Team.fetchOne(id, ctx)
    },
    teams(_, { where }, ctx) {
      // A little bit of API sugar to provide querying with e.g.
      // where: {
      //   role: 'test',
      //   object: {
      //     objectId: fragment.id,
      //     objectType: 'fragment',
      //   },
      //   members: [UUID]
      // }
      // which is then translated into appropriate JSON/relation queries.
      if (
        where &&
        where.object &&
        where.object.objectId &&
        where.object.objectType
      ) {
        const { object } = where
        delete where.object
        where._json = [
          { ref: 'teams.object:objectId', value: object.objectId },
          { ref: 'teams.object:objectType', value: object.objectType },
        ]
      }

      if (where.members) {
        const { members } = where
        delete where.members
        where._relations = [{ relation: 'members', ids: members }]
      }

      return ctx.connectors.Team.fetchAll(where, ctx)
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
    async addMembers(_, { id, members }, ctx) {
      await ctx.helpers.can(ctx.user, 'addMembers', id)

      let team = await ctx.connectors.Team.model.query().findById(id)
      await team.$relatedQuery('members').relate(members)

      team = await ctx.connectors.Team.model
        .query()
        .findById(id)
        .eager('members')

      team.members = team.members.map(member => member.id)

      const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, team)
      return outputFilter(team)
    },
    async removeMembers(_, { id, members }, ctx) {
      await ctx.helpers.can(ctx.user, 'removeMembers', id)

      let team = await ctx.connectors.Team.model.query().findById(id)
      await team
        .$relatedQuery('members')
        .unrelate()
        .whereIn('team_members.user_id', members)

      team = await ctx.connectors.Team.model
        .query()
        .findById(id)
        .eager('members')

      team.members = team.members.map(member => member.id)

      const outputFilter = await ctx.helpers.canKnowAbout(ctx.user, team)
      return outputFilter(team)
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
    teams(where: TeamInput): [Team]
  }

  extend type Mutation {
    createTeam(input: TeamInput): Team
    deleteTeam(id: ID): Team
    updateTeam(id: ID, input: TeamInput): Team
    addMembers(id: ID!, members: [ID!]!): Team
    removeMembers(id: ID!, members: [ID!]!): Team
  }

  type Team {
    id: ID!
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
    role: String
    name: String
    object: TeamObjectInput
    members: [ID!]
    global: Boolean

  }

  input TeamObjectInput {
    objectId: ID!
    objectType: String!
  }
`

module.exports = { resolvers, typeDefs }
