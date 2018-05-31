import React from 'react'
import { Page, Section, Heading, UploadContainer } from './molecules/Page'

import UploadManuscript from './UploadManuscript'
import withVersion from './withVersion'
import EditorItem from './sections/EditorItem'
import OwnerItem from './sections/OwnerItem'
import ReviewerItem from './sections/ReviewerItem'

const OwnerItemWithVersion = withVersion(OwnerItem)
const EditorItemWithVersion = withVersion(EditorItem)
const ReviewerItemWithVersion = withVersion(ReviewerItem)

const Dashboard = ({
  currentUser,
  conversion,
  dashboard,
  deleteProject,
  reviewerResponse,
  uploadManuscript,
}) => (
  <Page>
    <UploadContainer>
      <UploadManuscript
        conversion={conversion}
        uploadManuscript={uploadManuscript}
      />
    </UploadContainer>

    {!dashboard.length && (
      <UploadContainer>
        Nothing to do at the moment. Please upload a document.
      </UploadContainer>
    )}

    {dashboard.length > 0 && (
      <Section>
        <Heading>My Submissions</Heading>
        {dashboard.map(project => (
          <OwnerItemWithVersion
            deleteProject={() =>
              // eslint-disable-next-line no-alert
              window.confirm(
                'Are you sure you want to delete this submission?',
              ) && deleteProject(project)
            }
            key={project.id}
            project={project}
          />
        ))}
      </Section>
    )}

    {dashboard.length > 0 && (
      <Section>
        <Heading>To review</Heading>
        {dashboard.map(project => (
          <ReviewerItemWithVersion
            currentUser={currentUser}
            key={project.id}
            project={project}
            reviewerResponse={reviewerResponse}
          />
        ))}
      </Section>
    )}

    {dashboard.length > 0 && (
      <Section>
        <Heading>My Manuscripts</Heading>
        {dashboard.map(project => (
          <EditorItemWithVersion key={project.id} project={project} />
        ))}
      </Section>
    )}
  </Page>
)

export default Dashboard
