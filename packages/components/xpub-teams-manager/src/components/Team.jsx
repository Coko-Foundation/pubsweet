import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Menu } from '@pubsweet/ui'
import { TeamTableCell } from './molecules/Table'

const StyledMenu = styled(Menu)`
  width: 100%;
`

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.updateMembers = this.updateMembers.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  updateMembers(members) {
    const team = Object.assign(this.props.team, { members })
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

    return [
      <TeamTableCell width={5}>{number}</TeamTableCell>,
      <TeamTableCell>
        {team.name} {team.teamType.permissions}
      </TeamTableCell>,
      <TeamTableCell>
        {team.object.type} {team.object.id}
      </TeamTableCell>,
      <TeamTableCell width={40}>
        <StyledMenu
          inline
          multi
          name="members"
          onChange={this.updateMembers}
          options={options}
          value={team.members}
        />
      </TeamTableCell>,
      <TeamTableCell width={15}>
        <Button onClick={this.onDelete}>Delete</Button>
      </TeamTableCell>,
    ]
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
