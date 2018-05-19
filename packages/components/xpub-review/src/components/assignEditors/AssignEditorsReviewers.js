import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
        teamTypeName="seniorEditor"
        version={version}
      />
      <AssignEditor
        addUserToTeam={addUserToTeam}
        teamTypeName="handlingEditor"
        version={version}
      />
    </Roles>
    <Link to={`/projects/${project.id}/versions/${version.id}/reviewers`}>
      Assign Reviewers
    </Link>
  </Root>
)

export default AssignEditorsReviewers
