import React from 'react'
import styled from 'styled-components'

import { Button } from '@pubsweet/ui'

import { Item, Header, Body, Divider } from '../molecules/Item'
import { Links } from '../molecules/Links'

import Status from '../Status'
import ProjectLink from '../ProjectLink'
import VersionTitle from './VersionTitle'

// TODO
// ButtonAction, StyledLink and StyledDivider shouldn't even need to be here
// Clean up pending

const ButtonAction = Button.extend`
  min-width: 0;
`

const StyledLink = styled(ProjectLink)`
  &:hover {
    // DARKEN 30
    color: #16415d;
  }
`

const StyledDivider = styled(Divider)`
  padding: 0 3px;
`

const LinkAction = ({ label, page, project, version }) => (
  <ButtonAction>
    <StyledLink page={page} project={project} version={version}>
      {label}
    </StyledLink>
  </ButtonAction>
)

const OwnerItem = ({ project, version, deleteProject }) => {
  const itemHeader = (
    <Header>
      <Status status={project.status} />
    </Header>
  )

  const summaryLink = (
    <LinkAction
      label="Summary Info"
      page="submit"
      project={project}
      version={version}
    />
  )

  const manuscriptLink = (
    <LinkAction
      label="Manuscript"
      page="manuscript"
      project={project}
      version={version}
    />
  )

  const deleteButton = (
    <ButtonAction onClick={() => deleteProject(project)} plain>
      Delete
    </ButtonAction>
  )

  const actions = (
    <Links>
      {summaryLink}
      <StyledDivider separator="|" />
      {manuscriptLink}
      <StyledDivider separator="|" />
      {deleteButton}
    </Links>
  )

  const body = (
    <Body>
      <VersionTitle version={version} />
      {actions}
    </Body>
  )

  return (
    <Item>
      {itemHeader}
      {body}
    </Item>
  )
}

export default OwnerItem
