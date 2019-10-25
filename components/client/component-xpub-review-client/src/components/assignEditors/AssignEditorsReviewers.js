import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Roles } from '../molecules/Roles'

const Root = styled.div``
const Title = styled.div``

const AssignEditorsReviewers = ({ manuscript, journal, AssignEditor }) => (
  <Root>
    <Title>Assign Editors</Title>
    <Roles>
      <AssignEditor manuscript={manuscript} teamRole="seniorEditor" />
      <AssignEditor manuscript={manuscript} teamRole="handlingEditor" />
    </Roles>
    <Link to={`/journals/${journal.id}/versions/${manuscript.id}/reviewers`}>
      Assign Reviewers
    </Link>
  </Root>
)

export default AssignEditorsReviewers
