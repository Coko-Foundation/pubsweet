import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.updateMembers = this.updateMembers.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  updateMembers(members) {
    const memberIds = members.map(member => member.value)
    const team = Object.assign(this.props.team, { members: memberIds })
    this.props.update(team)
  }

  onDelete() {
    this.props.delete(this.props.team)
  }

  render() {
    const { team, number, users } = this.props

    const options = users.map(user => ({
      value: user.id,
      label: user.username,
    }))

    return (
      <tr className="team">
        <td>{number}</td>
        <td>{team.name}</td>
        <td>
          {team.teamType.name} ({team.teamType.permissions})
        </td>
        <td>
          {team.object.type} {team.object.id}
        </td>
        <td>
          <Select
            multi
            name="members"
            onChange={this.updateMembers}
            options={options}
            value={team.members.join(',')}
          />
        </td>
        <td>
          <button aria-label="Delete" onClick={this.onDelete} title="Delete">
            <i className="fa fa-trash-o" />
          </button>
        </td>
      </tr>
    )
  }
}

Team.propTypes = {
  team: PropTypes.object.isRequired,
  number: PropTypes.number,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}

export default Team
