import React from 'react'
import { CheckboxGroup } from '@pubsweet/ui'
import config from 'config'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const updateTeamMutation = gql`
  mutation($id: ID, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      id
      teamType
      name
      members {
        id
        username
        teams {
          id
          teamType
        }
      }
    }
  }
`

const createTeamMutation = gql`
  mutation($input: TeamInput) {
    createTeam(input: $input) {
      id
      teamType
      name
      members {
        id
        username
        teams {
          id
          teamType
        }
      }
    }
  }
`

const getTeamsQuery = gql`
  {
    teams {
      id
      teamType
      members {
        id
      }
    }
  }
`

const configuredTeams = config.authsome.teams
const teamsCheckboxGroupOptions = Object.entries(configuredTeams).map(
  ([shortName, details]) => ({
    value: shortName,
    label: details.name,
  }),
)

class User extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  findExistingTeam(teamType) {
    return this.props.getTeamsQuery.teams.find(
      team => team.teamType === teamType && team.object === undefined,
    )
  }

  addMember(teamType) {
    const { user } = this.props
    const existingTeam = this.findExistingTeam(teamType)

    if (existingTeam) {
      const members = existingTeam.members.map(member => member.id)
      if (!members.includes(user.id)) {
        members.push(user.id)
        this.updateTeamMutation({
          variables: {
            id: existingTeam.id,
            input: { members },
          },
        })
      }
    } else {
      this.createTeamMutation({
        variables: {
          input: {
            teamType,
            name: configuredTeams[teamType].name,
            members: [user.id],
          },
        },
      })
    }
  }

  removeMember(teamType) {
    const { user } = this.props
    const existingTeam = this.findExistingTeam(teamType)
    if (!existingTeam) {
      return
    }

    if (existingTeam) {
      let members = existingTeam.members.map(member => member.id)
      if (members.includes(user.id)) {
        members = members.filter(member => member !== user.id)
        this.updateTeamMutation({
          variables: {
            id: existingTeam.id,
            input: { members },
          },
        })
      }
    }
  }

  onTeamChange(teamTypes) {
    // Idempotently add member
    teamTypes.forEach(teamType => this.addMember(teamType))

    // Idempotently remove member
    const teamsDifference = Object.keys(configuredTeams).filter(
      teamType => !teamTypes.includes(teamType),
    )
    teamsDifference.forEach(teamType => this.removeMember(teamType))
  }

  render() {
    this.updateTeamMutation = this.props.updateTeamMutation
    this.createTeamMutation = this.props.createTeamMutation
    this.getTeamsQuery = this.props.getTeamsQuery

    const { user } = this.props

    return (
      <tr className="user">
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.admin ? 'yes' : ''}</td>
        <td>
          <CheckboxGroup
            inline
            name="checkboxgroup-inline"
            onChange={value => this.onTeamChange(value)}
            options={teamsCheckboxGroupOptions}
            value={user.teams.map(team => team.teamType)}
          />
        </td>
      </tr>
    )
  }
}

export default compose(
  graphql(updateTeamMutation, { name: 'updateTeamMutation' }),
  graphql(createTeamMutation, { name: 'createTeamMutation' }),
  graphql(getTeamsQuery, { name: 'getTeamsQuery' }),
)(User)
