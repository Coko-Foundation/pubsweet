import React from 'react'
import moment from 'moment'
import { Wax } from 'wax-prose-mirror'

import { Tabs } from '@pubsweet/ui'
import DecisionForm from './DecisionForm'
import DecisionReviews from './DecisionReviews'
import AssignEditorsReviewers from '../assignEditors/AssignEditorsReviewers'
import ReviewMetadata from '../metadata/ReviewMetadata'
import Decision from './Decision'
import { Columns, Manuscript, Admin } from '../atoms/Columns'
import { Info } from '../molecules/Info'
import { EditorWrapper } from '../molecules/EditorWrapper'
import AdminSection from '../atoms/AdminSection'

const DecisionLayout = ({
  currentVersion,
  handleSubmit,
  project,
  uploadFile,
  valid,
  versions,
  AssignEditor,
}) => {
  const decisionSections = []
  const editorSections = []

  versions.forEach(version => {
    // TODO: allow multiple decisions, e.g. appeals
    const { decision } = version
    if (decision && decision.submitted) {
      const submittedMoment = moment(decision.submitted)
      const label = submittedMoment.format('YYYY-MM-DD')

      decisionSections.push({
        content: (
          <div>
            <ReviewMetadata version={version} />
            <DecisionReviews version={version} />
            <Decision decision={decision} />
          </div>
        ),
        key: version.id,
        label,
      })

      editorSections.push({
        content:
          version.files.manuscript.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
            <EditorWrapper>
              <Wax key={version.id} readonly value={version.source} />
            </EditorWrapper>
          ) : (
            <Info>No supported view of the file</Info>
          ),
        key: version.id,
        label,
      })
    }
  }, [])

  const { decision } = currentVersion

  if (currentVersion.submitted && (!decision || !decision.submitted)) {
    const submittedMoment = moment()
    const label = submittedMoment.format('YYYY-MM-DD')
    decisionSections.push({
      content: (
        <div>
          <AdminSection>
            <AssignEditorsReviewers
              AssignEditor={AssignEditor}
              project={project}
              version={currentVersion}
            />
          </AdminSection>
          <AdminSection>
            <ReviewMetadata version={currentVersion} />
          </AdminSection>
          <AdminSection>
            <DecisionReviews version={currentVersion} />
          </AdminSection>
          <AdminSection>
            <DecisionForm
              handleSubmit={handleSubmit}
              uploadFile={uploadFile}
              valid={valid}
            />
          </AdminSection>
        </div>
      ),
      key: currentVersion.id,
      label,
    })

    editorSections.push({
      content:
        currentVersion.files.manuscript.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
          <EditorWrapper>
            <Wax
              key={currentVersion.id}
              readonly
              value={currentVersion.source}
            />
          </EditorWrapper>
        ) : (
          <Info>No supported view of the file</Info>
        ),
      key: currentVersion.id,
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
          activeKey={decisionSections[decisionSections.length - 1].key}
          sections={decisionSections}
          title="Versions"
        />
      </Admin>
    </Columns>
  )
}

export default DecisionLayout
