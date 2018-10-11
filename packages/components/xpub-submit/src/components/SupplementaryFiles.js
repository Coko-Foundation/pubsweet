import React from 'react'
import { branch, renderComponent } from 'recompose'
import { FormSection } from 'redux-form'
import { withJournal } from 'xpub-journal'
import ReactHtmlParser from 'react-html-parser'
import { Supplementary, ValidatedField, Attachment } from '@pubsweet/ui'
import { Section, Legend, SubNote } from '../styles'

const FileInput = uploadFile => ({ value, ...input }) => (
  <Supplementary files={value} uploadFile={uploadFile} {...input.field} />
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

const SupplementaryFilesNonEditable = ({ readonly, manuscript }) => (
  <Section id="files.supplementary">
    {manuscript.files.filter(file => file.type === 'supplementary').length > 0
      ? [
          <Legend htmlFor="supplementary">
            Supplementary materials uploaded
          </Legend>,
          <div>
            {manuscript.files
              .filter(file => file.type === 'supplementary')
              .map(attachment => (
                <Attachment key={attachment.url} value={attachment.filename} />
              ))}
          </div>,
        ]
      : null}
  </Section>
)

export default withJournal(
  branch(
    ({ readonly }) => readonly === true,
    renderComponent(SupplementaryFilesNonEditable),
  )(SupplementaryFiles),
)
