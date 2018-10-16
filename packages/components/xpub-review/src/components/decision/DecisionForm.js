import React from 'react'
import { NoteEditor } from 'xpub-edit'
import { Button, RadioGroup, FileUploadList, UploadingFile } from '@pubsweet/ui'
import { FieldArray, Field } from 'formik'
import { withJournal } from 'xpub-journal'
import { required } from 'xpub-validators'

import AdminSection from '../atoms/AdminSection'

const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

const createComments = (values, val) =>
  Object.assign(
    {
      type: 'note',
      content: '',
      files: [],
    },
    values.decision.comments[0],
    val,
  )

const NoteDecision = uploadFile => props => (
  <AdminSection>
    <Field component={NoteInput} validate={required} {...props} />
    <Field component={AttachmentsInput} uploadFile={uploadFile} {...props} />
  </AdminSection>
)

const NoteInput = ({ field, form: { values, handleChange }, replace }) => (
  <NoteEditor
    {...field}
    onChange={val => {
      replace(0, createComments(values, { content: stripHtml(val) }))
    }}
    placeholder="Write/paste your decision letter here, or upload it using the upload button on the right."
    title="Decision"
    value={field.value.length > 0 ? field.value[0].content : ''}
  />
)

const AttachmentsInput = ({
  field,
  form: { values, handleChange },
  replace,
}) => (
  <FileUploadList
    buttonText="↑ Upload files"
    FileComponent={UploadingFile}
    files={(values.decision.comments[0] || {}).files || []}
    uploadFile={val => {
      const file = {
        filename: val.name,
        name: val.name,
        size: val.size,
        fileType: val.type,
        type: 'note',
      }
      replace(0, createComments(values, { files: [file] }))
    }}
  />
)

const RecommendationInput = journal => ({ form, field }) => (
  <RadioGroup
    {...field}
    inline
    onChange={val => {
      form.setFieldValue(`${field.name}`, val, true)
    }}
    options={journal.recommendations}
    required
  />
)

const DecisionForm = ({ journal, handleSubmit, uploadFile, ...props }) => (
  <form onSubmit={handleSubmit}>
    <AdminSection>
      <div name="note">
        <FieldArray
          component={NoteDecision(uploadFile)}
          name="decision.comments"
        />
      </div>
    </AdminSection>

    <AdminSection>
      <Field
        component={RecommendationInput(journal)}
        name="decision.status"
        validate={required}
        {...props}
      />
    </AdminSection>

    <AdminSection>
      <Button primary type="submit">
        Submit
      </Button>
    </AdminSection>
  </form>
)

export default withJournal(DecisionForm)
