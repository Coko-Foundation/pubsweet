import React from 'react'
import { Button } from '@pubsweet/ui'
import AuthorizeWithGraphQL from 'pubsweet-client/src/helpers/AuthorizeWithGraphQL'
// Enable that when Team Models is updated
// import { getUserFromTeam } from 'xpub-selectors'
import { Item, Body, Divider } from '../molecules/Item'
import { Links, LinkContainer } from '../molecules/Links'
import { Actions, ActionContainer } from '../molecules/Actions'

import JournalLink from '../JournalLink'
import VersionTitle from './VersionTitle'

// TODO: only return links if version id is in reviewer.accepted array
// TODO: only return actions if not accepted or rejected
// TODO: review id in link

const ReviewerItem = ({ version, journals, currentUser, reviewerResponse }) => {
  const team =
    (version.teams || []).find(team => team.teamType === 'reviewerEditor') || {}
  const { status } =
    (team.status || []).filter(member => member.id === currentUser.id)[0] || {}

  // Enable that when Team Models is updated
  // const { status } =
  //   getUserFromTeam(version, 'reviewerEditor').filter(
  //     member => member.id === currentUser.id,
  //   )[0] || {}

  const review = version.reviews[0] || {}

  return (
    <AuthorizeWithGraphQL
      key={`${review.id}`}
      object={[version]}
      operation="can view review section"
    >
      <Item>
        <Body>
          <VersionTitle version={version} />

          {status === 'accepted' ||
            (status === 'completed' && (
              <Links>
                <LinkContainer>
                  <JournalLink
                    id={version.id}
                    journal={journals}
                    page="reviews"
                    version={version}
                  >
                    {review.recommendation ? 'Completed' : 'Do Review'}
                  </JournalLink>
                </LinkContainer>
              </Links>
            ))}

          {status === 'invited' && (
            <Actions>
              <ActionContainer>
                <Button
                  onClick={() => {
                    reviewerResponse(currentUser.id, 'accepted', team.id)
                  }}
                >
                  accept
                </Button>
              </ActionContainer>

              <Divider separator="|" />

              <ActionContainer>
                <Button
                  onClick={() => {
                    reviewerResponse(currentUser.id, 'rejected', team.id)
                  }}
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
