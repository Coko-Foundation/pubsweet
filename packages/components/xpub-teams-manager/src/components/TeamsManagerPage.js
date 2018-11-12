import { compose } from 'recompose'
import config from 'config'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

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

      const collectionsOptions = ((data || {}).manuscripts || []).map(
        collection => ({
          value: collection.id,
          label: collection.title,
        }),
      )
      const types = config.authsome.teams
      const typesOptions = Object.keys(types).map(type => ({
        value: type,
        label: `${types[type].name} ${types[type].permissions}`,
      }))

      return {
        teams: (data || {}).teams,
        collectionsOptions,
        userOptions,
        typesOptions,
      }
    },
  }),
  graphql(updateTeamMutation, {
    props: () => {
      const updateTeam = data => {}

      return {
        updateTeam,
      }
    },
  }),
  graphql(deleteTeamMutation, {
    props: () => {
      const deleteTeam = data => {}

      return {
        deleteTeam,
      }
    },
  }),
  graphql(createTeamMutation, {
    props: () => {
      const createTeam = data => {}

      return {
        createTeam,
      }
    },
  }),
  withLoader(),
)(TeamsManager)
