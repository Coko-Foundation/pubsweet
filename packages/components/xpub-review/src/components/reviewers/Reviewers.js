import React from 'react'
import styled from 'styled-components'
import { Link } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const Root = styled.div`
  display: flex;
  margin-top: calc(${th('gridUnit')} * 3);
`
const Form = styled.div``
const ReviewersList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Reviewers = ({
  ReviewerForm,
  Reviewer,
  journal,
  version,
  reviewers,
  reviewerUsers,
  manuscript,
  teams,
}) => (
  <Root>
    <Form>
      <ReviewerForm
        journal={journal}
        manuscript={manuscript}
        reviewerUsers={reviewerUsers}
        teams={teams}
      />
      <Link
        to={`/journals/${journal.id}/versions/${manuscript.id}/decisions/${
          manuscript.id
        }`}
      >
        Back to Control Panel
      </Link>
    </Form>

    {reviewers && (
      <ReviewersList>
        {reviewers.map(reviewer => (
          <Reviewer journal={journal} key={reviewer.id} reviewer={reviewer} />
        ))}
      </ReviewersList>
    )}
  </Root>
)

export default Reviewers
