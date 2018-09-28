import React from 'react'
import { Button } from '@pubsweet/ui'
import AuthorizeWithGraphQL from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'
import { getUserFromTeam } from 'xpub-selectors'
import { Item, Body, Divider } from '../molecules/Item'
import { Links, LinkContainer } from '../molecules/Links'
import { Actions, ActionContainer } from '../molecules/Actions'

import ProjectLink from '../ProjectLink'
import VersionTitle from './VersionTitle'

// TODO: only return links if version id is in reviewer.accepted array
// TODO: only return actions if not accepted or rejected
// TODO: review id in link

const ReviewerItem = ({ version, currentUser }) => {
  const { status } =
    getUserFromTeam(version, 'reviewer').filter(
      member => member.user.id === currentUser.id,
    )[0] || {}

  const review = version.reviews[0]
  return (
    <AuthorizeWithGraphQL
      key={`${review.id}`}
      object={[version]}
      operation="can view review section"
    >
      <Item>
        <Body>
          <VersionTitle version={version} />

          {status === 'accepted' && (
            <Links>
              <LinkContainer>
                <ProjectLink id={version.id} page="reviews" version={version}>
                  {review.recommendation ? 'Completed' : 'Do Review'}
                </ProjectLink>
              </LinkContainer>
            </Links>
          )}

          {status === 'invited' && (
            <Actions>
              <ActionContainer>
                <Button
                  onClick={() => {}}
                  // reviewerResponse(project, version, reviewer, 'accepted'
                >
                  accept
                </Button>
              </ActionContainer>

              <Divider separator="|" />

              <ActionContainer>
                <Button
                  onClick={() => {}}
                  // reviewerResponse(project, version, reviewer, 'rejected')
                >
                  reject
                </Button>
              </ActionContainer>
            </Actions>
          )}
          {status === 'rejected' && 'rejected'}
        </Body>
      </Item>
    </AuthorizeWithGraphQL>
  )
}

export default ReviewerItem
