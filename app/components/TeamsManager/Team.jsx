import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Team extends React.Component {
  update (val) {
    console.log('Selected: ' + val)
    var team = Object.assign(this.props.team, { teams: val.split(',') })
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
          {team.objectId}
        </td>
        <td>
          <Select
            name="form-field-name"
            multi
            value={team.members.join(',')}
            options={options}
            onChange={this.update}
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
