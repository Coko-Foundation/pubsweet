import React from 'react'

import { Action, ActionGroup } from '@pubsweet/ui'

import { Item, Header, Body } from '../molecules/Item'
import Status from '../Status'
import VersionTitle from './VersionTitle'

const OwnerItem = ({ project, version, deleteProject }) => {
  const itemHeader = (
    <Header>
      <Status status={project.status} />
    </Header>
  )

  const baseLink = `/projects/${project.id}/versions/${version.id}`
  const submitLink = `${baseLink}/submit`
  const manuscriptLink = `${baseLink}/manuscript`

  const actions = (
    <ActionGroup>
      <Action to={submitLink}>Summary Info</Action>
      <Action to={manuscriptLink}>Manuscript</Action>
      <Action onClick={() => deleteProject(project)}>Delete</Action>
    </ActionGroup>
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
