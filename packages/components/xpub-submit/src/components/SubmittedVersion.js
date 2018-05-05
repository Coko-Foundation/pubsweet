import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Attachment, { th } from '@pubsweet/ui'
import { withJournal } from 'xpub-journal'
import { Heading1, Section, Legend } from '../styles'
import { Columns, SubmissionVersion, Review } from './atoms/Columns'
import Accordion from './molecules/Accordion'

const Wrapper = styled.div`
  font-family: ${th('fontInterface')};
  line-height: 1.3;
  margin: auto;
  max-width: 60em;

  overflow: ${({ confirming }) => confirming && 'hidden'};
`

const Intro = styled.div`
  font-style: italic;
  line-height: 1.4;
`

const DeclarationSection = Section.extend`
  margin: calc(${th('gridUnit')} * 2) 0;
  display: flex;
  justify-content: space-between;
`

const SubLegend = Legend.extend`
  font-weight: normal;
  margin-top: ${th('gridUnit')};
`

const Abstract = styled.div`
  word-wrap: break-word;
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

const SubmittedVersion = ({
  project,
  version,
  handleSubmit,
  journal,
  toggleOpen,
  open,
}) => (
  <Wrapper>
    <Columns>
      <SubmissionVersion>
        <Heading1>Submission information</Heading1>
        <Intro>
          <div>
            We have ingested your manuscript. To access your manuscript in an
            editor, please{' '}
            <Link
              to={`/projects/${project.id}/versions/${version.id}/manuscript`}
            >
              view here
            </Link>.
          </div>
          <div>
            To complete your submission, please answer the following questions.
          </div>
          <div>The answers will be automatically saved.</div>
        </Intro>
        <Section id="metadata.title">
          <Legend>Title</Legend>
          <div>{version.metadata.title}</div>
        </Section>
        <Section id="metadata.abstract">
          <Legend>Abstract</Legend>
          <Abstract>{version.metadata.abstract}</Abstract>
        </Section>
        <Section id="metadata.keywords">
          <Legend>Keywords</Legend>
          <div>{version.metadata.keywords.join(', ')}</div>
        </Section>
        <DeclarationSection>
          <Legend>Type of article</Legend>
          {version.metadata.articleType}
        </DeclarationSection>
        {journal.declarations.questions.map(question => (
          <DeclarationSection>
            <Legend>{question.legend}</Legend>
            {version.declarations[question.id]}
          </DeclarationSection>
        ))}
        <Section id="suggestions.reviewers">
          <Legend>Suggested or opposed reviewers</Legend>
          <SubLegend>Suggested reviewers</SubLegend>
          <div>{version.suggestions.reviewers.suggested.join(', ')}</div>
          <SubLegend>Opposed reviewers</SubLegend>
          <div>{version.suggestions.reviewers.opposed.join(', ')}</div>
        </Section>
        <Section id="suggestions.editors">
          <Legend>Suggested or opposed editors</Legend>
          <SubLegend>Suggested editors</SubLegend>
          <div>{version.suggestions.editors.suggested.join(', ')}</div>
          <SubLegend>Opposed editors</SubLegend>
          <div>{version.suggestions.editors.opposed.join(', ')}</div>
        </Section>
        <Section id="files.supplementary">
          {version.files.supplementary.length > 0 && [
            <Legend htmlFor="supplementary">
              Supplementary materials uploaded
            </Legend>,
            <div>
              {version.files.supplementary.map(attachment => (
                <Attachment key={attachment.url} value={attachment.name} />
              ))}
            </div>,
          ]}
        </Section>
      </SubmissionVersion>
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
    </Columns>
  </Wrapper>
)

export default withJournal(SubmittedVersion)
