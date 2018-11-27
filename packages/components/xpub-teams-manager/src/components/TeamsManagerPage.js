import { compose } from 'recompose'
import { cloneDeep, omit } from 'lodash'
import config from 'config'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'

import TeamsManager from './TeamsManager'

const deleteTeamMutation = gql`
  mutation($id: ID) {
    deleteTeam(id: $id) {
      id
      type
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
        username
      }
    }
  }
`

const createTeamMutation = gql`
  mutation($input: TeamInput!) {
    createTeam(input: $input) {
      id
      type
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
        username
      }
    }
  }
`

const updateTeamMutation = gql`
  mutation($id: ID, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      id
      type
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
        username
      }
    }
  }
`

const fragmentFields = `
  id
  created
  meta {
    title
  }
`

const query = gql`
  query {
    teams {
      id
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
      }
    }

    users {
      id
      username
      admin
    }

    manuscripts {
      ${fragmentFields}
      manuscriptVersions {
        ${fragmentFields}
      }
    }
  }
`

export default compose(
  graphql(query, {
    props: ({ data }) => {
      const userOptions = ((data || {}).users || []).map(user => ({
        value: user.id,
        label: user.username,
      }))

      const manuscriptsOptions = ((data || {}).manuscripts || []).map(manu => ({
        value: manu.id,
        label: manu.meta.title,
      }))

      const types = config.authsome.teams
      const typesOptions = Object.keys(types).map(type => ({
        value: type,
        label: `${types[type].name} ${types[type].permissions}`,
      }))
      return {
        teams: (data || {}).teams,
        manuscriptsOptions,
        userOptions,
        typesOptions,
      }
    },
  }),
  graphql(updateTeamMutation, {
    props: ({ mutate }) => {
      const updateTeam = (members, team) => {
        const data = cloneDeep(team)
        const input = omit(data, ['id', 'object.__typename', '__typename'])

        input.members = members
        mutate({
          variables: {
            id: team.id,
            input,
          },
        })
      }

      return {
        updateTeam,
      }
    },
  }),
  graphql(deleteTeamMutation, {
    props: ({ mutate }) => {
      const deleteTeam = data => {
        mutate({
          variables: {
            id: data.id,
          },
        })
      }

      return {
        deleteTeam,
      }
    },
    options: {
      update: (proxy, { data: { deleteTeam } }) => {
        const data = proxy.readQuery({ query })
        const teamsIndex = data.teams.findIndex(
          team => team.id === deleteTeam.id,
        )
        if (teamsIndex > -1) {
          data.teams.splice(teamsIndex, 1)
          proxy.writeQuery({ query, data })
        }
      },
    },
  }),
  graphql(createTeamMutation, {
    props: ({ mutate }) => {
      const createTeam = input => {
        mutate({
          variables: {
            input,
          },
        })
      }

      return {
        createTeam,
      }
    },
    options: {
      update: (proxy, { data: { createTeam } }) => {
        const data = proxy.readQuery({ query })
        data.teams.push(createTeam)
        proxy.writeQuery({ query, data })
      },
    },
  }),
)(TeamsManager)
