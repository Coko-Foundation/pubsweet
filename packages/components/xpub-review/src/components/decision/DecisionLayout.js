import React from 'react'
import moment from 'moment'

import { Tabs } from '@pubsweet/ui'
import DecisionForm from './DecisionForm'
import DecisionReviews from './DecisionReviews'
import AssignEditorsReviewers from '../assignEditors/AssignEditorsReviewers'
import AssignEditor from '../assignEditors/AssignEditor'
import ReviewMetadata from '../metadata/ReviewMetadata'
import Decision from './Decision'
import EditorSection from './EditorSection'
import { Columns, Manuscript, Admin } from '../atoms/Columns'
import AdminSection from '../atoms/AdminSection'

const addEditor = (manuscript, label) => ({
  content: <EditorSection manuscript={manuscript} />,
  key: manuscript.id,
  label,
})

const DecisionLayout = ({
  handleSubmit,
  handleChangeFn,
  uploadFile,
  manuscript,
  journal,
}) => {
  const decisionSections = []
  const editorSections = []
  manuscript.manuscriptVersions.forEach(manuscript => {
    const { decision } = manuscript
    const submittedMoment = moment(decision.submitted)
    const label = submittedMoment.format('YYYY-MM-DD')
    decisionSections.push({
      content: (
        <div>
          <ReviewMetadata manuscript={manuscript} />
          <DecisionReviews manuscript={manuscript} />
          <Decision decision={manuscript.decision} />
        </div>
      ),
      key: manuscript.id,
      label,
    })

    editorSections.push(addEditor(manuscript, label))
  }, [])

  const submittedMoment = moment()
  const label = submittedMoment.format('YYYY-MM-DD')
  decisionSections.push({
    content: (
      <div>
        <AdminSection>
          <AssignEditorsReviewers
            AssignEditor={AssignEditor}
            journal={journal}
            manuscript={manuscript}
          />
        </AdminSection>
        <AdminSection>
          <ReviewMetadata manuscript={manuscript} />
        </AdminSection>
        <AdminSection>
          <DecisionReviews manuscript={manuscript} />
        </AdminSection>
        <AdminSection>
          <DecisionForm
            handleChangeFn={handleChangeFn}
            handleSubmit={handleSubmit}
            uploadFile={uploadFile}
          />
        </AdminSection>
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
          activeKey={decisionSections[decisionSections.length - 1].key}
          sections={decisionSections}
          title="Versions"
        />
      </Admin>
    </Columns>
  )
}

export default DecisionLayout
