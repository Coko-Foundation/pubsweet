import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu } from '@pubsweet/ui'

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

    let object
    if (team.object) {
      object = `${team.object.type} ${team.object.id}`
    } else {
      object = 'Global'
    }

    return (
      <tr>
        <td>{number}</td>
        <td>{team.name}</td>
        <td>{team.teamType}</td>
        <td>{object}</td>
        <td>
          <Menu
            inline
            multi
            name="members"
            onChange={this.updateMembers}
            options={options}
            value={team.members.join(',')}
          />
        </td>
        <td>
          <Button onClick={this.onDelete}>Delete</Button>
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
