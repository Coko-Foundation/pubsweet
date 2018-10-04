import React from 'react'
import { pickBy } from 'lodash'

import { Action, ActionGroup } from '@pubsweet/ui'
import AuthorizeWithGraphQL from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'

import { Item, Header, Body } from '../molecules/Item'
import Status from '../Status'
import VersionTitle from './VersionTitle'

const OwnerItem = ({ version, deleteManuscript }) => {
  const itemHeader = (
    <Header>
      <Status status={version.status} />
    </Header>
  )

  const baseLink = `/projects/JOURNALID/versions/${version.id}`
  const submitLink = `${baseLink}/submit`
  const manuscriptLink = `${baseLink}/manuscript`

  const actionButtons = {
    submit: (
      <Action key="submit-action" to={submitLink}>
        Summary Info
      </Action>
    ),
    manuscript: (
      <Action key="manuscript-action" to={manuscriptLink}>
        Manuscript
      </Action>
    ),
    delete: (
      <Action key="delete-action" onClick={() => deleteManuscript(version)}>
        Delete
      </Action>
    ),
  }

  const unauthorized = (
    <ActionGroup>
      {Object.values(pickBy(actionButtons, (value, key) => key !== 'delete'))}
    </ActionGroup>
  )

  const actions = (
    <AuthorizeWithGraphQL
      object={version}
      operation="can delete collection"
      unauthorized={unauthorized}
    >
      <ActionGroup>{Object.values(actionButtons)}</ActionGroup>
    </AuthorizeWithGraphQL>
  )

  const body = (
    <Body>
      <VersionTitle version={version} />
      {actions}
    </Body>
  )

  return (
    <AuthorizeWithGraphQL
      object={[version]}
      operation="can view my submission section"
    >
      <Item>
        {itemHeader}
        {body}
      </Item>
    </AuthorizeWithGraphQL>
  )
}

export default OwnerItem
