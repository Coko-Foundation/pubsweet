import React from 'react'
import { branch, renderComponent } from 'recompose'
import { FormSection } from 'redux-form'
import { withJournal } from 'xpub-journal'
import ReactHtmlParser from 'react-html-parser'
import { Supplementary, ValidatedField, Attachment } from '@pubsweet/ui'
import { Section, Legend, SubNote } from '../styles'

const FileInput = uploadFile => ({ value, ...input }) => (
  <Supplementary files={value} uploadFile={uploadFile} {...input} />
)

const SupplementaryFiles = ({ uploadFile, readonly, journal }) => (
  <FormSection name="files">
    <Section id="files.supplementary">
      <Legend htmlFor="supplementary">Upload supplementary materials</Legend>
      <ValidatedField
        component={FileInput(uploadFile)}
        name="supplementary"
        readonly={readonly}
      />
    </Section>
    <SubNote>{ReactHtmlParser(journal.supplementary.description)} </SubNote>
  </FormSection>
)

const SupplementaryFilesNonEditable = ({ readonly, version }) => (
  <Section id="files.supplementary">
    {version.files.supplementary.length > 0 && [
      <Legend htmlFor="supplementary">Supplementary materials uploaded</Legend>,
      <div>
        {version.files.supplementary.map(attachment => (
          <Attachment key={attachment.url} value={attachment.name} />
        ))}
      </div>,
    ]}
  </Section>
)

export default withJournal(
  branch(
    ({ readonly }) => readonly === true,
    renderComponent(SupplementaryFilesNonEditable),
  )(SupplementaryFiles),
)
