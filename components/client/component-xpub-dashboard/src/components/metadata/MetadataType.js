import React from 'react'
import { withJournal } from 'xpub-journal'

const MetadataType = ({ journal, type }) => (
  <span>
    {(journal.articleTypes.find(item => item.value === type) || {}).label ||
      'None'}
  </span>
)

export default withJournal(MetadataType)