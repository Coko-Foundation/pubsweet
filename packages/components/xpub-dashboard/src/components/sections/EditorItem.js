import React from 'react'

import styled from 'styled-components'
import AuthorizeWithGraphQL from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'
import { Action, ActionGroup } from '@pubsweet/ui'
import { getUserFromTeam } from 'xpub-selectors'

import { Item, Header, Body } from '../molecules/Item'
import Status from '../Status'
import Meta from '../metadata/Meta'
import MetadataSections from '../metadata/MetadataSections'
import MetadataType from '../metadata/MetadataType'
import MetadataReviewType from '../metadata/MetadataReviewType'
import MetadataSubmittedDate from '../metadata/MetadataSubmittedDate'
import MetadataAuthors from '../metadata/MetadataAuthors'
import MetadataStreamLined from '../metadata/MetadataStreamLined'
import ProjectLink from '../ProjectLink'
import Reviews from '../Reviews'
import VersionTitle from './VersionTitle'

const VersionTitleLink = styled(ProjectLink)`
  text-decoration: none;
  color: #333;
`

const EditorItemLinks = ({ version }) => (
  <ActionGroup>
    <Action to={`/projects/JournalID/versions/${version.id}/submit`}>
      Summary Info
    </Action>
    <Action
      to={`/projects/JournalID/versions/${version.id}/decisions/${version.id}`}
    >
      {version.decision && version.decision.status === 'submitted'
        ? `Decision: ${version.decision.recommendation}`
        : 'Control Panel'}
    </Action>
  </ActionGroup>
)

const getDeclarationsObject = (version, value) => {
  const declarations = version.meta.declarations || {}

  return declarations[value] || 'no'
}

const getMetadataObject = (version, value) => {
  const metadata = version.meta || {}
  return metadata[value] || []
}

const EditorItem = ({ version }) => (
  <AuthorizeWithGraphQL
    object={[version]}
    operation="can view my manuscripts section"
  >
    <Item>
      <Header>
        <Status status={version.status} />
        <Meta>
          <MetadataStreamLined
            streamlinedReview={getDeclarationsObject(
              version,
              'streamlinedReview',
            )}
          />
          <MetadataAuthors authors={getUserFromTeam(version, 'author')} />
          <MetadataSubmittedDate
            submitted={
              version.meta.history.find(history => history.type === 'submitted')
                .date
            }
          />
          <MetadataType type={getMetadataObject(version, 'articleType')} />
          <MetadataSections
            sections={getMetadataObject(version, 'articleSections')}
          />
          <MetadataReviewType
            openPeerReview={getDeclarationsObject(version, 'openPeerReview')}
          />
        </Meta>
      </Header>
      <Body>
        <VersionTitleLink id={version.id} page="decisions" version={version}>
          <VersionTitle linkUrl="true" version={version} />
        </VersionTitleLink>
        <EditorItemLinks project={version} version={version} />
      </Body>

      <Reviews version={version} />
    </Item>
  </AuthorizeWithGraphQL>
)

export default EditorItem
