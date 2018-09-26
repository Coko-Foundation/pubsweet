import React from 'react'
import { withJournal } from 'xpub-journal'

const MetadataSections = ({ journal, sections }) => (
  <span>
    {sections &&
      sections
        .map(section => (
          <span key={section}>
            {journal.articleSections.find(item => item.value === section).label}
          </span>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
  </span>
)

export default withJournal(MetadataSections)
