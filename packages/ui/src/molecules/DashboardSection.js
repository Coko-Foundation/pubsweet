import React from 'react'
import styled from 'styled-components'

import th from '../helpers/themeHelper'

import Manuscript from './Manuscript'

const SectionHeader = styled.h1`
  font-family: ${th('fontInterface')};
`

const DashboardSection = ({ label, papers }) => (
  <div>
    <SectionHeader>{label}</SectionHeader>
    {papers.map(paper => (
      <Manuscript authors={paper.authors} title={paper.title} />
    ))}
  </div>
)

export default DashboardSection
