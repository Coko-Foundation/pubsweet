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
  project,
  version,
  reviewers,
  reviewerUsers,
}) => (
  <Root>
    <Form>
      <ReviewerForm
        project={project}
        reviewerUsers={reviewerUsers}
        version={version}
      />
      <Link
        to={`/projects/${project.id}/versions/${version.id}/decisions/${
          project.id
        }`}
      >
        Back to Control Panel
      </Link>
    </Form>

    {reviewers && (
      <ReviewersList>
        {reviewers.map(reviewer => (
          <Reviewer key={reviewer.id} project={project} reviewer={reviewer} />
        ))}
      </ReviewersList>
    )}
  </Root>
)

export default Reviewers
