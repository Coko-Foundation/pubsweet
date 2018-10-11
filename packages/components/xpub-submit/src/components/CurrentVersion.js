import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Attachment } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import Metadata from './MetadataFields'
import Declarations from './Declarations'
import Suggestions from './Suggestions'
import SupplementaryFiles from './SupplementaryFiles'

import Confirm from './Confirm'
import { Heading1, Section, Legend } from '../styles'

const Wrapper = styled.div`
  font-family: ${th('fontInterface')};
  line-height: 1.3;
  margin: auto;
  max-width: 60em;

  overflow: ${({ confirming }) => confirming && 'hidden'};
`

const Intro = styled.div`
  font-style: italic;
  line-height: 1.4;
`

const ModalWrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

const filterFileManuscript = files =>
  files.filter(
    file =>
      file.type === 'manuscript' &&
      file.mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )

// Due to migration to new Data Model
// Attachement component needs different data structure to work
// needs to change the pubsweet ui Attachement to support the new Data Model
const filesToAttachment = file => ({
  name: file.filename,
  url: file.url,
})

const CurrentVersion = ({
  journal,
  forms,
  manuscript,
  valid,
  error,
  readonly,
  handleSubmit,
  uploadFile,
  confirming,
  toggleConfirming,
}) => (
  <Wrapper>
    <Heading1>Submission information</Heading1>

    <Intro>
      <div>
        We have ingested your manuscript. To access your manuscript in an
        editor, please{' '}
        <Link
          to={`/journals/${journal.id}/versions/${manuscript.id}/manuscript`}
        >
          view here
        </Link>.
      </div>
      <div>
        To complete your submission, please answer the following questions.
      </div>
      <div>The answers will be automatically saved.</div>
    </Intro>

    <Metadata manuscript={manuscript} readonly={readonly} />
    <Declarations forms={forms} manuscript={manuscript} readonly={readonly} />
    <Suggestions manuscript={manuscript} readonly={readonly} />
    <SupplementaryFiles
      manuscript={manuscript}
      readonly={readonly}
      uploadFile={uploadFile}
    />
    {filterFileManuscript(manuscript.files).length > 0 && (
      <Section id="files.manuscript">
        <Legend space>Submitted Manuscript</Legend>
        <Attachment
          file={filesToAttachment(filterFileManuscript(manuscript.files)[0])}
          key={filterFileManuscript(manuscript.files)[0].url}
          uploaded
        />
      </Section>
    )}

    {manuscript.status !== 'submitted' && (
      <div>
        <Button onClick={toggleConfirming} primary type="button">
          Submit your manuscript
        </Button>
      </div>
    )}
    {confirming && (
      <ModalWrapper>
        <Confirm toggleConfirming={toggleConfirming} />
      </ModalWrapper>
    )}
  </Wrapper>
)

export default CurrentVersion
