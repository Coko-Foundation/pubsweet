import React from 'react'
import styled from 'styled-components'
import { withJournal } from 'xpub-journal'

import { Attachment } from '@pubsweet/ui'

const Root = styled.div``

const Title = styled.div``

const Table = styled.table`
  border-spacing: 0;
`

const Heading = styled.span`
  font-weight: inherit;
  padding: 0 1em 0 0;
  white-space: nowrap;
  text-align: right;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
`
const Metadata = styled.div`
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`

const Cell = styled.span`
  padding: 0;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
`
const arrayToText = text => (text.length === 0 ? ['none'] : text).join(', ')

const ReviewMetadata = ({ version, handlingEditors, journal }) => (
  <Root>
    <Title>Metadata</Title>
    <Metadata>
      <div>
        <Heading>Open Peer Review :</Heading>
        <Cell>
          {version.declarations.openPeerReview === 'yes' ? 'Yes' : 'No'}
        </Cell>
      </div>
      <div>
        <Heading>Streamlined Review :</Heading>
        <Cell>
          {version.declarations.streamlinedReview === 'yes'
            ? 'Please view supplementary uploaded files'
            : 'No'}
        </Cell>
      </div>
      <div>
        <Heading>Part of Research Nexus :</Heading>
        <Cell>
          {version.declarations.researchNexus === 'yes' ? 'Yes' : 'No'}
        </Cell>
      </div>
      <div>
        <Heading>Pre-registered :</Heading>
        <Cell>
          {version.declarations.preregistered === 'yes' ? 'Yes' : 'No'}
        </Cell>
      </div>
      <div>
        <Heading>Suggested Reviewers :</Heading>
        <Cell>
          {arrayToText(
            ((version.suggestions || {}).reviewers || {}).suggested || [],
          )}
        </Cell>
      </div>
      <div>
        <Heading>Opposed Reviewers :</Heading>
        <Cell>
          {arrayToText(
            ((version.suggestions || {}).reviewers || {}).opposed || [],
          )}
        </Cell>
      </div>
      <div>
        <Heading>Suggested Editors :</Heading>
        <Cell>
          {arrayToText(
            ((version.suggestions || {}).editors || {}).suggested || [],
          )}
        </Cell>
      </div>
      <div>
        <Heading>Opposed Editors :</Heading>
        <Cell>
          {arrayToText(
            ((version.suggestions || {}).editors || {}).opposed || [],
          )}
        </Cell>
      </div>
      <div>
        <Heading>Special Instructions :</Heading>
        <Cell>
          {((version.notes || {}).specialInstructions || '') === '' && 'none'}
          {version.notes.specialInstructions}
        </Cell>
      </div>
      <div>
        <Heading>
          {version.files.supplementary.length} supplementary{' '}
          {version.files.supplementary.length === 1 ? 'file' : 'files'} :
        </Heading>
        {!!version.files.supplementary.length && (
          <Cell>
            {version.files.supplementary.map(file => (
              <Attachment file={file} key={file.url} uploaded />
            ))}
          </Cell>
        )}
      </div>
    </Metadata>
    <Table>
      <tbody>
        {!!handlingEditors && (
          <tr>
            <Heading>handling editor:</Heading>
            <Cell>
              {handlingEditors.map(user => (
                <span key={user.username}>{user.username}</span>
              ))}
            </Cell>
          </tr>
        )}
      </tbody>
    </Table>
  </Root>
)

export default withJournal(ReviewMetadata)
