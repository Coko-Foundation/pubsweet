import React from 'react'

import styled from 'styled-components'
import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { Action, ActionGroup } from '@pubsweet/ui'
import { Item, Header, Body } from '../molecules/Item'

import Status from '../Status'
import Meta from '../metadata/Meta'
import MetadataSections from '../metadata/MetadataSections'
import MetadataType from '../metadata/MetadataType'
import MetadataReviewType from '../metadata/MetadataReviewType'
import MetadataSubmittedDate from '../metadata/MetadataSubmittedDate'
import MetadataOwners from '../metadata/MetadataOwners'
import MetadataStreamLined from '../metadata/MetadataStreamLined'
import ProjectLink from '../ProjectLink'
import Reviews from '../Reviews'
import VersionTitle from './VersionTitle'

const VersionTitleLink = styled(ProjectLink)`
  text-decoration: none;
  color: #333;
`

const EditorItemLinks = ({ project, version }) => (
  <ActionGroup>
    <Action to={`/projects/${project.id}/versions/${version.id}/submit`}>
      Summary Info
    </Action>
    <Action
      to={`/projects/${project.id}/versions/${version.id}/decisions/${
        project.id
      }`}
    >
      {version.decision && version.decision.status === 'submitted'
        ? `Decision: ${version.decision.recommendation}`
        : 'Control Panel'}
    </Action>
  </ActionGroup>
)

const getDeclarationsObject = (version, value) => {
  const declarations = version.declarations || {}
  return declarations[value] || 'no'
}

const getMetadataObject = (version, value) => {
  const metadata = version.metadata || {}
  return metadata[value] || []
}

const EditorItem = ({ project, version }) => (
  <Authorize object={[project]} operation="can view my manuscripts section">
    <Item>
      <Header>
        <Status status={project.status} />
        <Meta>
          <MetadataStreamLined
            streamlinedReview={getDeclarationsObject(
              version,
              'streamlinedReview',
            )}
          />
          <MetadataOwners owners={project.owners} />
          <MetadataSubmittedDate submitted={version.submitted} />
          <MetadataType type={getMetadataObject(version, 'articleType')} />
          <MetadataSections
            sections={getMetadataObject(version, 'articleSection')}
          />
          <MetadataReviewType
            openPeerReview={getDeclarationsObject(version, 'openPeerReview')}
          />
        </Meta>
      </Header>
      <Body>
        <VersionTitleLink
          id={project.id}
          page="decisions"
          project={project}
          version={version}
        >
          <VersionTitle linkUrl="true" version={version} />
        </VersionTitleLink>
        <EditorItemLinks project={project} version={version} />
      </Body>

      <Reviews project={project} version={version} />
    </Item>
  </Authorize>
)

export default EditorItem
