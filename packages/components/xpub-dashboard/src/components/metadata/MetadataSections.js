import React from 'react'
import { withJournal } from 'xpub-journal'

const MetadataSections = ({ journal, sections }) =>
  sections.length ? (
    <span>
      {sections.length &&
        sections
          .map(section => (
            <span key={section}>
              {
                journal.articleSections.find(item => item.value === section)
                  .label
              }
            </span>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])}
    </span>
  ) : null

export default withJournal(MetadataSections)
