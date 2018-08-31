import React from 'react'
import styled from 'styled-components'
import { Tabs } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import moment from 'moment'
import CurrentVersion from './CurrentVersion'
import DecisionReviewColumn from './DecisionReviewColumn'
import { Columns, SubmissionVersion } from './atoms/Columns'
import FormTemplate from './FormTemplate'

const Wrapper = styled.div`
  font-family: ${th('fontInterface')};
  line-height: 1.3;
  margin: auto;
  max-width: 60em;

  overflow: ${({ confirming }) => confirming && 'hidden'};
`

const SubmittedVersionColumns = props => (
  <Wrapper>
    <Columns>
      <SubmissionVersion>
        <CurrentVersion
          project={props.project}
          readonly
          version={props.version}
        />,
      </SubmissionVersion>
      <DecisionReviewColumn {...props} />
    </Columns>
  </Wrapper>
)

const Submit = ({
  project,
  submittedVersion,
  currentVersion,
  forms,
  ...formProps
}) => {
  const decisionSections = []

  submittedVersion.forEach(versionElem => {
    const submittedMoment = moment(versionElem.submitted)
    const label = submittedMoment.format('YYYY-MM-DD')
    decisionSections.push({
      content: (
        <SubmittedVersionColumns project={project} version={versionElem} />
      ),
      key: versionElem.id,
      label,
    })
  })

  // decisionSections.push({
  //   content: (
  //     <CurrentVersion
  //       {...formProps}
  //       project={project}
  //       readonly={false}
  //       version={currentVersion}
  //     />
  //   ),
  //   key: "pao", // currentVersion.id,
  //   label: 'Current Version pao',
  // })

  decisionSections.push({
    content: (
      <FormTemplate
        {...formProps}
        form={forms}
        project={project}
        version={currentVersion}
      />
    ),
    key: currentVersion.id,
    label: 'Current Version',
  })

  return (
    <Wrapper>
      <Tabs
        activeKey={currentVersion.id}
        sections={decisionSections}
        title="Versions"
      />
    </Wrapper>
  )
}

export default Submit
