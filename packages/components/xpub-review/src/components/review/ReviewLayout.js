import React from 'react'

import moment from 'moment'
import { Tabs } from '@pubsweet/ui'

import ReviewForm from './ReviewForm'
import ReviewMetadata from '../metadata/ReviewMetadata'
import Review from './Review'
import EditorSection from '../decision/EditorSection'
import { Columns, Manuscript, Admin } from '../atoms/Columns'

const addEditor = (manuscript, label) => ({
  content: <EditorSection manuscript={manuscript} />,
  key: manuscript.id,
  label,
})

const ReviewLayout = ({
  currentUser,
  manuscript,
  review,
  reviewer,
  handleSubmit,
  uploadFile,
  isValid,
  status,
}) => {
  const reviewSections = []
  const editorSections = []

  manuscript.manuscriptVersions.forEach(manuscript => {
    const label = moment().format('YYYY-MM-DD')
    reviewSections.push({
      content: (
        <div>
          <ReviewMetadata manuscript={manuscript} />
          <Review
            review={manuscript.reviews.find(
              review => review.user.id === currentUser.id,
            )}
          />
        </div>
      ),
      key: manuscript.id,
      label,
    })

    editorSections.push(addEditor(manuscript, label))
  }, [])

  const label = moment().format('YYYY-MM-DD')

  reviewSections.push({
    content: (
      <div>
        <ReviewMetadata manuscript={manuscript} />
        {status === 'accepted' && review.recommendation !== '' ? (
          <Review review={review} />
        ) : (
          <ReviewForm
            handleSubmit={handleSubmit}
            isValid={isValid}
            uploadFile={uploadFile}
          />
        )}
      </div>
    ),
    key: manuscript.id,
    label,
  })

  editorSections.push(addEditor(manuscript, label))

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
