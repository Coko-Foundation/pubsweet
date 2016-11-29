import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { Button } from 'react-bootstrap'

class Team extends React.Component {
  constructor (props) {
    super(props)
    this.updateMembers = this.updateMembers.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  updateMembers (members) {
    var memberIds = members.map(member => member.value)
    var team = Object.assign(this.props.team, { members: memberIds })
    this.props.update(team)
  }

  onDelete () {
    this.props.delete(this.props.team)
  }

  render () {
    let { team, number, users } = this.props

    let options = users.map(function (user) {
      return {value: user.id, label: user.username}
    })

    return (
      <tr className='team'>
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
          {team.object.type} {team.object.id}
        </td>
        <td>
          <Select
            name='members'
            multi
            value={team.members.join(',')}
            options={options}
            onChange={this.updateMembers}
          />
        </td>
        <td>
          <Button bsStyle='danger' onClick={this.onDelete} title='Delete' aria-label='Delete'>
            <i className='fa fa-trash-o' />
          </Button>
        </td>
      </tr>
    )
  }
}

Team.propTypes = {
  team: React.PropTypes.object.isRequired,
  number: React.PropTypes.number,
  update: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired,
  users: React.PropTypes.array.isRequired
}

export default Team
