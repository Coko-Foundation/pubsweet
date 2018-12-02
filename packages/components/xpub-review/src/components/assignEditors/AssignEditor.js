import React from 'react'
import { compose, withProps } from 'recompose'
import { cloneDeep } from 'lodash'
import { Menu } from '@pubsweet/ui'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
// import { addUserToTeam } from '../../redux/teams'

const editorOption = user => ({
  label: user.username, // TODO: name
  value: user.id,
})

const teamFields = `
  id
  role
  name
  object {
    id
  }
  objectType
  members {
    status
    user {
      id
      username
    }
  }
`

const query = gql`
  {
    users {
      id
      username
      admin
    }

    teams {
      ${teamFields}
    }
  }
`

const updateTeam = gql`
  mutation($id: ID!, $input: String) {
    assignTeamEditor(id: $id, input: $input) {
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
        const teams = cloneDeep(ownProps.data.teams).find(
          team =>
            team.role === teamRole &&
            team.object.id === ownProps.manuscript.id &&
            team.objectType === 'manuscript',
        )

        const member = teams.members.find(member => member.user.id === userId)
        const team = cloneDeep(teams)
        team.members = [member]

        const { manuscript } = cloneDeep(ownProps)
        const replacePrevious = manuscript.teams.filter(
          team => team.role !== teamRole,
        )
        replacePrevious.push(team)

        mutate({
          variables: {
            id: ownProps.manuscript.id,
            input: JSON.stringify({ teams: replacePrevious }),
          },
        })
      }

      return {
        updateTeam,
      }
    },
  }),
  withProps(({ teamRole, manuscript, data: { users, teams } }) => {
    const filteredTeams = (teams || []).find(
      team =>
        team.role === teamRole &&
        team.object.id === manuscript.id &&
        team.objectType === 'manuscript',
    )
    const members = ((filteredTeams || {}).members || []).map(
      members => members.user,
    )
    const optionUsers = members.map(user => editorOption(user))

    return {
      filteredTeams,
      teams,
      teamName: (filteredTeams || {}).name,
      options: optionUsers,
      value: manuscript.teams.find(team => team.teamRole),
    }
  }),
)(AssignEditor)
