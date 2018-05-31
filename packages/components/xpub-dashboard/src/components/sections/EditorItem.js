import React from 'react'

import styled from 'styled-components'
import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { Item, Header, Body } from '../molecules/Item'
import { Links, LinkContainer } from '../molecules/Links'

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
  <Links>
    <LinkContainer>
      {/* {(!version.decision ||
        version.decision.status !== 'revising' ||
        version.decision.status !== 'submitted') && (
        <span>
          <ProjectLink page="reviewers" project={project} version={version}>
            Assign Reviewers
          </ProjectLink>

          <Divider separator="|" />
        </span>
      )} */}

      <ProjectLink
        id={project.id}
        page="decisions"
        project={project}
        version={version}
      >
        {version.decision && version.decision.status === 'submitted'
          ? `Decision: ${version.decision.recommendation}`
          : 'Control Panel'}
      </ProjectLink>
    </LinkContainer>
  </Links>
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
