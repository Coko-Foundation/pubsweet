const resolvers = {
  Query: {
    team(_, { id }, ctx) {
      return ctx.connectors.Team.fetchOne(id, ctx)
    },
    teams(_, { where }, ctx) {
      if (where.users) {
        const { users } = where
        delete where.users
        where._relations = [{ relation: 'users', ids: users }]
      }

      if (where.alias) {
        const { alias } = where
        delete where.alias
        where._relations = [{ relation: 'aliases', object: alias }]
      }

      return ctx.connectors.Team.fetchAll(where, ctx)
    },
  },
  Mutation: {
    deleteTeam(_, { id }, ctx) {
      return ctx.connectors.Team.delete(id, ctx)
    },
    createTeam(_, { input }, ctx) {
      const options = {
        relate: ['members.user'],
        unrelate: ['members.user'],
        allowUpsert: '[members, members.alias]',
      }
      return ctx.connectors.Team.create(input, ctx, options)
    },
    updateTeam(_, { id, input }, ctx) {
      return ctx.connectors.Team.update(id, input, ctx)
    },
  },
  Team: {
    async members(team, { where }, ctx) {
      return team.members
        ? team.members
        : ctx.connectors.Team.fetchRelated(team.id, 'members', where, ctx)
    },
    object(team, vars, ctx) {
      const { objectId, objectType } = team
      return objectId && objectType ? { objectId, objectType } : null
    },
  },
  TeamMember: {
    async user(teamMember, vars, ctx) {
      return teamMember.user
        ? teamMember.user
        : ctx.connectors.TeamMember.fetchRelated(
            teamMember.id,
            'user',
            undefined,
            ctx,
          )
    },
    async alias(teamMember, vars, ctx) {
      return teamMember.alias
        ? teamMember.alias
        : ctx.connectors.TeamMember.fetchRelated(
            teamMember.id,
            'alias',
            undefined,
            ctx,
          )
    },
  },
}

const typeDefs = `
  extend type Query {
    team(id: ID): Team
    teams(where: TeamWhereInput): [Team]
  }

  extend type Mutation {
    createTeam(input: TeamInput): Team
    deleteTeam(id: ID): Team
    updateTeam(id: ID, input: TeamInput): Team
    addMembers(id: ID!, members: [TeamMemberInput!]!): Team
    removeMembers(id: ID!, members: [TeamMemberInput!]!): Team
  }

  type Team {
    id: ID!
    type: String!
    role: String!
    name: String!
    object: TeamObject
    members: [TeamMember!]!
    owners: [User]
    global: Boolean
  }

  input TeamMemberInput {
    id: ID
    user: TeamMemberUserInput
    alias: AliasInput
    status: String
  }

  input TeamMemberUserInput {
    id: ID!
  }

  type TeamMember {
    user: User
    status: String
    alias: Alias
  }

  type Alias {
    name: String
    email: String
    aff: String
  }

  input AliasInput {
    name: String
    email: String
    aff: String
  }

  type TeamObject {
    objectId: ID!
    objectType: String!
  }

  input TeamInput {
    role: String
    name: String
    objectId: ID
    objectType: String
    members: [TeamMemberInput]
    global: Boolean
  }

  input TeamWhereInput {
    role: String
    name: String
    objectId: ID
    objectType: String
    members: [TeamMemberInput]
    global: Boolean
    users: [ID!]
    alias: AliasInput
  }

`

module.exports = { resolvers, typeDefs }
