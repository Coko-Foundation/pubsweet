import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui'
import moment from 'moment'
import Tabs from './atoms/Tabs'
import CurrentVersionPage from './CurrentVersionPage'
import SubmittedVersion from './SubmittedVersion'

const Wrapper = styled.div`
  font-family: ${th('fontInterface')};
  line-height: 1.3;
  margin: auto;
  max-width: 60em;

  overflow: ${({ confirming }) => confirming && 'hidden'};
`

const Submit = ({
  project,
  submittedVersion,
  currentVersion,
  valid,
  error,
  readonly,
  handleSubmit,
  uploadFile,
  confirming,
  toggleConfirming,
}) => {
  const decisionSections = []

  console.log(submittedVersion,currentVersion)

  submittedVersion.forEach(versionElem => {
    const submittedMoment = moment(versionElem.submitted)
    const label = submittedMoment.format('YYYY-MM-DD')
    decisionSections.push({
      content: <SubmittedVersion project={project} version={versionElem} />,
      key: versionElem.id,
      label,
    })
  })

  decisionSections.push({
    content: <CurrentVersionPage project={project} version={currentVersion} />,
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
