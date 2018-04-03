import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxGroup } from '@pubsweet/ui'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.props.getTeams()
    this.state = {}

    this.teamsCheckboxGroupOptions = Object.entries(props.configuredTeams).map(
      ([shortName, details]) => ({
        value: shortName,
        label: details.name,
      }),
    )
  }

  findExistingTeam(teamType) {
    const { teams } = this.props
    return teams.find(
      team => team.teamType === teamType && team.object === undefined,
    )
  }

  addMember(teamType) {
    const { user, createTeam, updateTeam, configuredTeams } = this.props
    const existingTeam = this.findExistingTeam(teamType)
    if (existingTeam) {
      if (!existingTeam.members.includes(user.id)) {
        // console.log('found team', existingTeam, 'would add user', user)
        existingTeam.members.push(user.id)
        updateTeam(existingTeam)
      } else {
        // console.log('user already member of', existingTeam)
      }
    } else {
      // console.log('team not found', teamType, 'would create team with', user)

      createTeam({
        teamType,
        name: configuredTeams[teamType].name,
        members: [user.id],
      })
    }
  }

  removeMember(teamType) {
    const { user, updateTeam } = this.props
    const existingTeam = this.findExistingTeam(teamType)
    if (!existingTeam) {
      return
    }

    if (existingTeam) {
      if (existingTeam.members.includes(user.id)) {
        // console.log('found team', existingTeam, 'would remove user', user)
        existingTeam.members = existingTeam.members.filter(
          member => member !== user.id,
        )
        updateTeam(existingTeam)
      }
    }
  }

  onTeamChange(teamTypes) {
    const { configuredTeams } = this.props

    // Idempotently add member
    teamTypes.forEach(teamType => this.addMember(teamType))

    // Idempotently remove member
    const teamsDifference = Object.keys(configuredTeams).filter(
      teamType => !teamTypes.includes(teamType),
    )
    teamsDifference.forEach(teamType => this.removeMember(teamType))
  }

  render() {
    const { user, teams, configuredTeams } = this.props
    const activeTeams = Object.entries(configuredTeams).filter(
      ([teamType, _]) =>
        teams.find(
          team =>
            team.teamType === teamType &&
            team.object === undefined &&
            team.members.includes(user.id),
        ),
    )
    const checkBoxValue = activeTeams
      ? activeTeams.map(([teamType, _]) => teamType)
      : []

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
            options={this.teamsCheckboxGroupOptions}
            value={checkBoxValue}
          />
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
