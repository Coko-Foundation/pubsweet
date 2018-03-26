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

  processTeamMembership(teamType) {
    const { user, createTeam, updateTeam, teams, configuredTeams } = this.props

    const existingTeam = teams.find(
      team => team.teamType === teamType && team.object === undefined,
    )

    if (existingTeam) {
      // console.log('found team', existingTeam, 'would add user', user)
      existingTeam.members.push(user.id)
      updateTeam(existingTeam)
    } else {
      // console.log(
      //   'theme not found',
      //   existingTeam,
      //   'would create team for',
      //   user,
      // )
      createTeam({
        teamType,
        name: configuredTeams[teamType].name,
        members: [user.id],
      })
    }
  }

  onTeamChange(teamTypes) {
    teamTypes.each(teamType => this.processTeamMembership(teamType))
  }

  render() {
    const { user, teams, configuredTeams } = this.props
    const activeTeams = Object.entries(configuredTeams).find(
      ([teamType, _]) => {
        const teamsOfType = teams.find(
          team => team.teamType === teamType && team.object === undefined,
        )
        if (teamsOfType) {
          const isMember = teamsOfType.find(team =>
            team.members.includes(user.id),
          )
          return isMember
        }
        return false
      },
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
