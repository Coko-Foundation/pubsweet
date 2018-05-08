import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui'
import { withJournal } from 'xpub-journal'
import { Section, Legend } from '../styles'
import { Review } from './atoms/Columns'
import Accordion from './molecules/Accordion'

const Intro = styled.div`
  font-style: italic;
  line-height: 1.4;
`

const DeclarationSection = Section.extend`
  margin: calc(${th('gridUnit')} * 2) 0;
  display: flex;
  justify-content: space-between;
`

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
