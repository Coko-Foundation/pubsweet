import React from 'react'
import { Menu } from '@pubsweet/ui'

// TODO: select multiple editors
const AssignEditor = ({ team, teamName, options, addUserToTeam }) => (
  <Menu
    label={teamName}
    onChange={addUserToTeam}
    options={options}
    placeholder="Assign an editor…"
    value={team && team.members[0] ? team.members[0].id : null}
  />
)

export default AssignEditor
