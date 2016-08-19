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
    let { team, number } = this.props

    let options = [
      { value: 'admin', label: 'admin' },
      { value: 'contributor', label: 'contributor' },
      { value: 'reader', label: 'reader' }
    ]

    return (
      <tr className="team">
        <td>
          {number}
        </td>
        <td>
          {team.name}
        </td>
        <td>
          {JSON.stringify(team.teamType)}
        </td>
        <td>
          {team.object}
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
  update: React.PropTypes.func.isRequired
}

export default Team
