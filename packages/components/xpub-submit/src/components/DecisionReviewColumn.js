import React from 'react'
import styled from 'styled-components'
import { withJournal } from 'xpub-journal'
import { Section } from '../styles'
import { Review } from './atoms/Columns'
import Accordion from './molecules/Accordion'

const ReviewAccord = styled.div``

const ReviewsItem = styled.div`
  margin-left: 1em;
`

const ReviewAccordion = ({ reviewers }) => (
  <ReviewAccord>
    {reviewers.length > 0 &&
      reviewers.map((review, index) => {
        if (!review.note) return null
        return (
          <Accordion
            Component={review.note.content}
            key={review.id}
            ordinal={index + 1}
            title="Review"
            withDots="true"
          />
        )
      })}
  </ReviewAccord>
)

const DecisionReviewColumn = ({
  project,
  version,
  handleSubmit,
  journal,
  toggleOpen,
  open,
}) => (
  <Review>
    <Accordion
      Component={<ReviewsItem>{version.decision.note.content}</ReviewsItem>}
      key="decision"
      status="revise"
      title="Decision"
    />
    <ReviewsItem>
      {version.reviewers && (
        <Section id="accordion.review">
          <Accordion
            Component={<ReviewAccordion reviewers={version.reviewers} />}
            key="review"
            title="Reviews"
          />
        </Section>
      )}
    </ReviewsItem>
  </Review>
)

export default withJournal(DecisionReviewColumn)
