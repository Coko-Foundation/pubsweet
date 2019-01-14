import React from 'react'
import styled from 'styled-components'
import { Button, Menu } from '@pubsweet/ui'
import { TeamTableCell } from './molecules/Table'

const StyledMenu = styled(Menu)`
  width: 100%;
`

const Team = ({ team, number, userOptions, deleteTeam, updateTeam }) =>
  team
    ? [
        <TeamTableCell width={5}>{number}</TeamTableCell>,
        <TeamTableCell>
          {team.name} {team.teamType.permissions}
        </TeamTableCell>,
        <TeamTableCell>
          {team.object.objectType} {team.object.objectId}
        </TeamTableCell>,
        <TeamTableCell width={40}>
          <StyledMenu
            inline
            multi
            name="members"
            onChange={members => updateTeam(members, team)}
            options={userOptions}
            value={team.members.map(member => member.id)}
          />
        </TeamTableCell>,
        <TeamTableCell width={15}>
          <Button onClick={() => deleteTeam(team)}>Delete</Button>
        </TeamTableCell>,
      ]
    : null

export default Team
