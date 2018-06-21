import React from 'react'

import { Action, ActionGroup } from '@pubsweet/ui'
import Authorize from 'pubsweet-client/src/helpers/Authorize'

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
      <Authorize object={version} operation="can delete latest version">
        <Action onClick={() => deleteProject(project)}>Delete</Action>
      </Authorize>
    </ActionGroup>
  )

  const body = (
    <Body>
      <VersionTitle version={version} />
      {actions}
    </Body>
  )

  return (
    <Authorize object={[project]} operation="can view my submission section">
      <Item>
        {itemHeader}
        {body}
      </Item>
    </Authorize>
  )
}

export default OwnerItem
