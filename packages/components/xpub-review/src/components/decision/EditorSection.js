import React from 'react'
import { Wax } from 'wax-prose-mirror'
import { EditorWrapper } from '../molecules/EditorWrapper'
import { Info } from '../molecules/Info'

export default ({ manuscript }) =>
  ((manuscript.files || []).find(file => file.type === 'manuscript') || '')
    .type ===
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
    <EditorWrapper>
      <Wax key={manuscript.id} readonly value={manuscript.meta.source} />
    </EditorWrapper>
  ) : (
    <Info>No supported view of the file</Info>
  )
