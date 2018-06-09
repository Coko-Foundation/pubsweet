import React from 'react'
import { withJournal } from 'xpub-journal'

const MetadataSections = ({ journal, sections }) =>
  sections.map((section, index) => [
    index === 0 ? null : <span key={section}>, </span>,
    <span key={section}>
      {journal.articleSections.find(item => item.value === section).label}
    </span>,
  ])

export default withJournal(MetadataSections)
