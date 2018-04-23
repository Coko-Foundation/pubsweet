import React from 'react'
import styled from 'styled-components'

import { Roles } from '../molecules/Roles'

const Root = styled.div``
const Title = styled.div``

const AssignEditorsReviewers = ({
  AssignEditor,
  version,
  project,
  addUserToTeam,
}) => (
  <Root>
    <Title>Assign Editors</Title>
    <Roles>
      <AssignEditor
        addUserToTeam={addUserToTeam}
        project={project}
        teamTypeName="seniorEditor"
      />
      <AssignEditor
        addUserToTeam={addUserToTeam}
        project={project}
        teamTypeName="handlingEditor"
      />
    </Roles>
  </Root>
)

export default AssignEditorsReviewers
