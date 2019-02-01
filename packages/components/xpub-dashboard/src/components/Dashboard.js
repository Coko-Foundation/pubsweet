import React from 'react'
import Authorize from 'pubsweet-client/src/helpers/Authorize'
import { Page, Section, Heading, UploadContainer } from './molecules/Page'

import UploadManuscript from './UploadManuscript'
import EditorItem from './sections/EditorItem'
import OwnerItem from './sections/OwnerItem'
import ReviewerItem from './sections/ReviewerItem'

const Dashboard = ({
  acceptFiles,
  currentUser,
  conversion,
  dashboard,
  journals,
  deleteManuscript,
  reviewerResponse,
  uploadManuscript,
  ...props
}) => (
  <Page>
    <UploadContainer>
      <UploadManuscript
        acceptFiles={acceptFiles}
        conversion={conversion}
        uploadManuscript={uploadManuscript}
      />
    </UploadContainer>

    {!dashboard.length && (
      <UploadContainer>
        Nothing to do at the moment. Please upload a document.
      </UploadContainer>
    )}
    <Authorize object={dashboard} operation="can view my submission section">
      {dashboard.length > 0 ? (
        <Section>
          <Heading>My Submissions</Heading>
          {dashboard.map(submission => (
            <OwnerItem
              deleteManuscript={() =>
                // eslint-disable-next-line no-alert
                window.confirm(
                  'Are you sure you want to delete this submission?',
                ) && deleteManuscript(submission)
              }
              journals={journals}
              key={`submission-${submission.id}`}
              version={submission}
            />
          ))}
        </Section>
      ) : null}
    </Authorize>
    <Authorize object={dashboard} operation="can view review section">
      {dashboard.length > 0 ? (
        <Section>
          <Heading>To review</Heading>
          {dashboard.map(review => (
            <ReviewerItem
              currentUser={currentUser}
              journals={journals}
              key={review.id}
              reviewerResponse={reviewerResponse}
              version={review}
            />
          ))}
        </Section>
      ) : null}
    </Authorize>

    <Authorize object={dashboard} operation="can view my manuscripts section">
      {dashboard.length > 0 ? (
        <Section>
          <Heading>My Manuscripts</Heading>
          {dashboard.map(manuscript => (
            <EditorItem
              journals={journals}
              key={`manuscript-${manuscript.id}`}
              version={manuscript}
            />
          ))}
        </Section>
      ) : null}
    </Authorize>
  </Page>
)

export default Dashboard
