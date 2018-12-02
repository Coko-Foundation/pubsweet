import React from 'react'
import styled from 'styled-components'

import { Field, FieldArray } from 'formik'
import { NoteEditor } from 'xpub-edit'
import { Button, RadioGroup, FileUploadList, UploadingFile } from '@pubsweet/ui' // Attachments

import { withJournal } from 'xpub-journal'
import { required } from 'xpub-validators'

import AdminSection from '../atoms/AdminSection'

const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

const createComments = (values, val, type) => {
  let updateIndex = values.comments.findIndex(comment => comment.type === type)
  updateIndex = values.comments.length > 0 && updateIndex < 0 ? 1 : updateIndex
  updateIndex = updateIndex < 0 ? 0 : updateIndex

  const comment = Object.assign(
    {
      type,
      content: '',
      files: [],
    },
    values.comments[updateIndex],
    val,
  )

  return { updateIndex, comment }
}

const AttachmentsInput = type => ({
  field,
  form: { values, handleChange },
  replace,
}) => (
  <FileUploadList
    buttonText="↑ Upload files"
    FileComponent={UploadingFile}
    files={
      (values.comments.find(comment => comment.type === type) || {}).files || []
    }
    uploadFile={val => {
      const file = {
        filename: val.name,
        name: val.name,
        size: val.size,
        fileType: val.type,
        type: 'attachments',
      }
      const { updateIndex, comment } = createComments(
        values,
        { files: [file] },
        type,
      )
      replace(updateIndex, comment)
    }}
  />
)

const NoteInput = ({ field, form: { values }, replace, push }) => (
  <NoteEditor
    placeholder="Enter your review…"
    title="Comments to the Author"
    {...field}
    onChange={value => {
      const { updateIndex, comment } = createComments(values, {
        type: 'note',
        content: stripHtml(value),
      })
      replace(updateIndex, comment)
    }}
    value={
      (values.comments.find(value => value.type === 'note') || {}).content || ''
    }
  />
)

const ConfidentialInput = ({ field, form: { values }, replace, push }) => (
  <NoteEditor
    placeholder="Enter a confidential note to the editor (optional)…"
    title="Confidential Comments to Editor (Optional)"
    {...field}
    onChange={value => {
      const { updateIndex, comment } = createComments(values, {
        type: 'confidential',
        content: stripHtml(value),
      })
      replace(updateIndex, comment)
    }}
    value={
      (values.comments.find(value => value.type === 'confidential') || {})
        .content || ''
    }
  />
)

const RecommendationInput = journal => ({ form, field }) => (
  <RadioGroup
    inline
    options={journal.recommendations}
    {...field}
    onChange={val => {
      form.setFieldValue(`${field.name}`, val, true)
    }}
  />
)

const ReviewComment = uploadFile => props => [
  <AdminSection>
    <div name="note">
      <Field component={NoteInput} validate={required} {...props} />
      <Field component={AttachmentsInput('note')} {...props} />
    </div>
  </AdminSection>,
  <AdminSection>
    <div name="confidential">
      <Field component={ConfidentialInput} {...props} />
      <Field component={AttachmentsInput('confidential')} {...props} />
    </div>
  </AdminSection>,
]

const Title = styled.div``

const ReviewForm = ({ journal, isValid, handleSubmit, uploadFile }) => (
  <form onSubmit={handleSubmit}>
    <FieldArray component={ReviewComment(uploadFile)} name="comments" />
    <AdminSection>
      <div name="Recommendation">
        <Title>Recommendation</Title>
        <Field
          component={RecommendationInput(journal)}
          name="recommendation"
          validate={required}
        />
      </div>
    </AdminSection>

    <AdminSection>
      <Button disabled={!isValid} primary type="submit">
        Submit
      </Button>
    </AdminSection>
  </form>
)

export default withJournal(ReviewForm)
