import React from 'react'
import styled from 'styled-components'

import { NoteViewer } from 'xpub-edit'
import { Attachment } from '@pubsweet/ui'

const Heading = styled.div``
const Note = styled.div``
const Content = styled.div``
const DecisionStatus = styled.div``

const findComments = (decision = {}, type) => {
  const comments = decision.comments || []
  return comments.find(comment => comment.type === type)
}

// Due to migration to new Data Model
// Attachement component needs different data structure to work
// needs to change the pubsweet ui Attachement to support the new Data Model
const filesToAttachment = file => ({
  name: file.filename,
  url: file.url,
})

const Decision = ({ decision }) => (
  <div>
    <div>
      {findComments(decision, 'note') && [
        <Heading>Note</Heading>,
        <Note>
          <Content>
            <NoteViewer value={findComments(decision, 'note').content} />
          </Content>
          {findComments(decision, 'note') &&
            (findComments(decision, 'note').files || []).map(attachment => (
              <Attachment
                file={filesToAttachment(attachment)}
                key={attachment.url}
                uploaded
              />
            ))}
        </Note>,
      ]}
    </div>

    <div>
      <Heading>Decision</Heading>

      <DecisionStatus>{decision.status}</DecisionStatus>
    </div>
  </div>
)

export default Decision
