import { compose, withProps } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'
import { withJournal } from 'xpub-journal'
import AssignEditor from './AssignEditor'

const query = gql`
  {
    users {
      id
      username
    }
    teams {
      id
      name
      members {
        id
        username
      }
      object {
        id
        type
      }
      teamType {
        name
        permissions
      }
    }
  }
`

const createTeamMutation = gql`
  mutation($input: String) {
    createTeam(input: $input) {
      id
    }
  }
`
const updateTeamMutation = gql`
  mutation($id: ID, $input: String) {
    updateTeam(id: $id, input: $input) {
      id
    }
  }
`

export default compose(
  graphql(query),
  graphql(updateTeamMutation, {
    name: 'updateTeam',
    options: { refetchQueries: [{ query }] },
  }),
  graphql(createTeamMutation, {
    name: 'createTeam',
    options: { refetchQueries: [{ query }] },
  }),
  withJournal,
  withLoader(),
  withProps(
    ({
      users,
      teams,
      project,
      teamTypeName,
      updateTeam,
      createTeam,
      journal,
    }) => {
      // get journal specific name for the role (team type)
      const teamName = journal.roles[teamTypeName]

      // does a team already exist for this role?
      const team =
        teams &&
        teams.find(
          team =>
            team.object.type === 'collection' &&
            team.object.id === project.id &&
            team.teamType.name === teamTypeName,
        )

      // handle selection by either creating or updating the team
      const addUserToTeam = user => {
        if (team) {
          updateTeam({
            variables: { id: team.id, input: JSON.stringify(team) },
          })
        } else {
          createTeam({
            variables: {
              input: JSON.stringify({
                teamType: {
                  name: teamTypeName,
                  permissions: 'editor', // TODO
                },
                group: 'editor',
                name: teamName,
                object: {
                  type: 'collection',
                  id: project.id,
                },
                members: [user],
              }),
            },
          })
        }
      }

      // construct options for drop-down
      const options =
        users &&
        users
          // .filter(user => user.roles.includes(teamType)) // TODO
          .map(user => ({
            label: user.username, // TODO: name
            value: user.id,
          }))

      return {
        options,
        addUserToTeam,
        teamName,
        team,
      }
    },
  ),
)(AssignEditor)
