import React from 'react'
import { compose, withProps } from 'recompose'
import { cloneDeep } from 'lodash'
import { Menu } from '@pubsweet/ui'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'

const editorOption = user => ({
  label: user.username, // TODO: name
  value: user.id,
})

const teamFields = `
  id
  name
  teamType
  object {
    objectId
    objectType
  }
  members {
    id
    username
  }
`

const query = gql`
  {
    users {
      id
      username
      admin
    }
  }
`

const updateTeam = gql`
  mutation($id: ID!, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      ${teamFields}
    } 
  }
`

// TODO: select multiple editors
const AssignEditor = ({ updateTeam, teamName, teamRole, value, options }) => (
  <Menu
    label={teamName}
    onChange={user => {
      updateTeam(user, teamRole)
    }}
    options={options}
    placeholder="Assign an editor…"
    value={value}
  />
)

export default compose(
  graphql(query),
  graphql(updateTeam, {
    props: ({ mutate, ownProps }) => {
      const updateTeam = (userId, teamRole) => {
        const team = cloneDeep(ownProps.manuscript.teams).find(
          team => team.teamType === teamRole,
        )
        mutate({
          variables: {
            id: team.id,
            input: {
              members: [userId],
            },
          },
        })
      }

      return {
        updateTeam,
      }
    },
  }),
  withProps(({ teamRole, manuscript, data = {} }) => {
    const optionUsers = (data.users || []).map(user => editorOption(user))

    const team =
      (manuscript.teams || []).find(team => team.teamType === teamRole) || {}

    const members = team.members || []
    return {
      teamName: team.name,
      options: optionUsers,
      value: members.length > 0 ? members[0].id : undefined,
    }
  }),
  withLoader(),
)(AssignEditor)
