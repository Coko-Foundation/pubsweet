import React from 'react'
import styled from 'styled-components'
import { withJournal } from 'xpub-journal'
import ReactHtmlParser from 'react-html-parser'

import { File } from '@pubsweet/ui'

const Root = styled.div``

const Title = styled.div``

const Table = styled.table`
  border-spacing: 0;
`

const Heading = styled.span`
  font-weight: inherit;
  padding: 0 1em 0 0;
  white-space: nowrap;
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
`

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
          {version.suggestions.reviewers.suggested.length === 0 && 'none'}
          {version.suggestions.reviewers.suggested.concat()}
        </Cell>
      </div>
      <div>
        <Heading>Opposed Reviewers :</Heading>
        <Cell>
          {version.suggestions.reviewers.opposed.length === 0 && 'none'}
          {version.suggestions.reviewers.opposed.concat()}
        </Cell>
      </div>
      <div>
        <Heading>Suggested Editors :</Heading>
        <Cell>
          {version.suggestions.editors.suggested.length === 0 && 'none'}
          {version.suggestions.editors.suggested.concat()}
        </Cell>
      </div>
      <div>
        <Heading>Opposed Editors :</Heading>
        <Cell>
          {version.suggestions.editors.opposed.length === 0 && 'none'}
          {version.suggestions.editors.opposed.concat()}
        </Cell>
      </div>
      <div>
        <Heading>Special Instructions :</Heading>
        <Cell>
          {ReactHtmlParser(version.notes.specialInstructions) || 'none'}
        </Cell>
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

        {!!version.files.supplementary.length && (
          <tr>
            <Heading>
              {version.files.supplementary.length} supplementary{' '}
              {version.files.supplementary.length === 1 ? 'file' : 'files'}:
            </Heading>
            <Cell>
              {version.files.supplementary.map(file => (
                <File file={file} key={file.url} value={file} />
              ))}
            </Cell>
          </tr>
        )}
      </tbody>
    </Table>
  </Root>
)

export default withJournal(ReviewMetadata)
