import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Team extends React.Component {
  constructor (props) {
    super(props)
    this.updateMembers = this.updateMembers.bind(this)
  }

  updateMembers (members) {
    console.log('Selected: ' + members)
    var team = Object.assign(this.props.team, { members: members.split(',') })
    this.props.update(team)
  }

  render () {
    let { team, number, users } = this.props

    let options = users.map(function (user) {
      return {value: user.id, label: user.username}
    })

    return (
      <tr className="team">
        <td>
          {number}
        </td>
        <td>
          {team.name}
        </td>
        <td>
          {team.teamType.name} ({team.teamType.permissions})
        </td>
        <td>
          {team.objectType} {team.objectId}
        </td>
        <td>
          <Select
            name="members"
            multi
            value={team.members.join(',')}
            options={options}
            onChange={this.updateMembers}
          />
        </td>
      </tr>
    )
  }
}

Team.propTypes = {
  team: React.PropTypes.object.isRequired,
  number: React.PropTypes.number,
  update: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired
}

export default Team
