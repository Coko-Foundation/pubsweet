import React from 'react'

import moment from 'moment'
import { Tabs } from '@pubsweet/ui'
import { Wax } from 'wax-prose-mirror'

import ReviewForm from './ReviewForm'
import ReviewMetadata from '../metadata/ReviewMetadata'
import Review from './Review'
import { Columns, Manuscript, Admin } from '../atoms/Columns'
import { EditorWrapper } from '../molecules/EditorWrapper'
import { Info } from '../molecules/Info'

const ReviewLayout = ({
  project,
  versions,
  lastSubmitted,
  handlingEditors,
  reviewer,
  valid,
  handleSubmit,
  uploadFile,
}) => {
  const reviewSections = []
  const editorSections = []

  versions.forEach(version => {
    let review
    if (version.reviewers) {
      review = version.reviewers.find(
        review => review.reviewer === reviewer._reviewer.id,
      )
    }

    if (review && review.submitted) {
      const submittedMoment = moment(review.submitted)
      const key = version.id
      const label = submittedMoment.format('YYYY-MM-DD')

      reviewSections.push({
        content: (
          <div>
            <ReviewMetadata
              handlingEditors={handlingEditors}
              version={version}
            />
            <Review review={review} />
          </div>
        ),
        key,
        label,
      })

      // TODO: need to include unreviewed versions?
      editorSections.push({
        content:
          lastSubmitted.files.manuscript.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
            <EditorWrapper>
              <Wax key={key} readonly value={lastSubmitted.source} />
            </EditorWrapper>
          ) : (
            <Info>No supported view of the file</Info>
          ),
        key,
        label,
      })
    }
  }, [])

  const review = lastSubmitted.reviewers.find(
    review => review.id === reviewer.id,
  )

  if (lastSubmitted.submitted && (!review || !review.submitted)) {
    const submittedMoment = moment()
    const key = lastSubmitted.id
    const label = submittedMoment.format('YYYY-MM-DD')

    reviewSections.push({
      content: (
        <div>
          <ReviewMetadata
            handlingEditors={handlingEditors}
            version={lastSubmitted}
          />
          <ReviewForm
            handleSubmit={handleSubmit}
            review={review}
            uploadFile={uploadFile}
            valid={valid}
          />
        </div>
      ),
      key,
      label,
    })

    editorSections.push({
      content:
        lastSubmitted.files.manuscript.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
          <EditorWrapper>
            <Wax key={key} readonly value={lastSubmitted.source} />
          </EditorWrapper>
        ) : (
          <Info>No supported view of the file</Info>
        ),
      key,
      label,
    })
  }

  return (
    <Columns>
      <Manuscript>
        <Tabs
          activeKey={editorSections[editorSections.length - 1].key}
          sections={editorSections}
          title="Versions"
        />
      </Manuscript>

      <Admin>
        <Tabs
          activeKey={reviewSections[reviewSections.length - 1].key}
          sections={reviewSections}
          title="Versions"
        />
      </Admin>
    </Columns>
  )
}

export default ReviewLayout
