import React from 'react'
import { pickBy } from 'lodash'
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

  const actionButtons = {
    submit: <Action to={submitLink}>Summary Info</Action>,
    manuscript: <Action to={manuscriptLink}>Manuscript</Action>,
    delete: <Action onClick={() => deleteProject(project)}>Delete</Action>,
  }

  const unauthorized = (
    <ActionGroup>
      {Object.values(pickBy(actionButtons, (value, key) => key !== 'delete'))}
    </ActionGroup>
  )

  const actions = (
    <Authorize
      object={project}
      operation="can delete collection"
      unauthorized={unauthorized}
    >
      <ActionGroup>{Object.values(actionButtons)}</ActionGroup>
    </Authorize>
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
