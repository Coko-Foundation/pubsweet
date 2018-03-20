import React from 'react'

import moment from 'moment'
// import classnames from 'classnames'
import SimpleEditor from 'wax-editor-react'

import ReviewForm from './ReviewForm'
import ReviewMetadata from '../metadata/ReviewMetadata'
import Review from './Review'
import { Columns, Manuscript, Admin } from '../atoms/Columns'
import Tabs from '../atoms/Tabs'

const ReviewLayout = ({
  project,
  versions,
  currentVersion,
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
      const key = submittedMoment.format('x')
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
        content: (
          <SimpleEditor
            content={version.source}
            editing="selection"
            key={key}
            layout="bare"
            readOnly
          />
        ),
        key,
        label,
      })
    }
  }, [])

  const review = currentVersion.reviewers.find(
    review => review.id === reviewer.id,
  )

  if (currentVersion.submitted && (!review || !review.submitted)) {
    const submittedMoment = moment()
    const key = 'currentversion-key'
    const label = submittedMoment.format('YYYY-MM-DD')

    reviewSections.push({
      content: (
        <div>
          <ReviewMetadata
            handlingEditors={handlingEditors}
            version={currentVersion}
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
      content: (
        <SimpleEditor
          content={currentVersion.source}
          editing="selection"
          key={key}
          layout="bare"
          readOnly
        />
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
