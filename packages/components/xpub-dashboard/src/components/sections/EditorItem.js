import React from 'react'

import styled from 'styled-components'
import { Item, Header, Body, Divider } from '../molecules/Item'
import { Links, LinkContainer } from '../molecules/Links'
import { Roles, Role } from '../molecules/Roles'

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

const EditorItem = ({ AssignEditor, project, version, addUserToTeam }) => (
  <Item>
    <Header>
      <Status status={project.status} />
      <Meta>
        <MetadataStreamLined
          streamlinedReview={version.declarations.streamlinedReview}
        />
        <MetadataOwners owners={project.owners} />
        <Divider separator="–" />
        <MetadataSubmittedDate submitted={version.submitted} />
        <Divider separator="–" />
        <MetadataType type={version.metadata.articleType} />
        <Divider separator="–" />
        <MetadataSections sections={version.metadata.articleSection} />
        <Divider separator="–" />
        <MetadataReviewType
          openPeerReview={version.declarations.openPeerReview}
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

    <Roles>
      <Role>
        <AssignEditor
          addUserToTeam={addUserToTeam}
          project={project}
          teamTypeName="seniorEditor"
        />
      </Role>

      <Role>
        <AssignEditor
          addUserToTeam={addUserToTeam}
          project={project}
          teamTypeName="handlingEditor"
        />
      </Role>
    </Roles>

    <Reviews project={project} version={version} />
  </Item>
)

export default EditorItem
