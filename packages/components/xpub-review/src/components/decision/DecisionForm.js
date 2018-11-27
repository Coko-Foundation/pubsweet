import React from 'react'
import { NoteEditor } from 'xpub-edit'
import { cloneDeep, set } from 'lodash'
import { FieldArray, Field } from 'formik'
import { withJournal } from 'xpub-journal'
import { required } from 'xpub-validators'
import {
  Button,
  Flexbox,
  RadioGroup,
  UploadButton,
  UploadingFile,
} from '@pubsweet/ui'

import {
  getCommentFiles,
  getCommentContent,
  stripHtml,
  createComments,
} from '../review/util'

import AdminSection from '../atoms/AdminSection'

const NoteDecision = (updateReview, uploadFile, review) => props => (
  <AdminSection>
    <Field
      component={NoteInput}
      review={review}
      updateReview={updateReview}
      validate={required}
      {...props}
    />
    <Field
      component={AttachmentsInput('note')}
      review={review}
      updateReview={updateReview}
      uploadFile={uploadFile}
      {...props}
    />
  </AdminSection>
)

const NoteInput = ({ field, form: { values }, review, updateReview }) => (
  <NoteEditor
    {...field}
    key="note-input"
    onBlur={value => {
      const { updateIndex, comment } = createComments(
        values,
        {
          type: 'note',
          content: stripHtml(value),
        },
        'note',
      )

      const data = cloneDeep(review)
      set(data, `comments.${updateIndex}`, comment)

      updateReview(data)
    }}
    placeholder="Write/paste your decision letter here, or upload it using the upload button on the right."
    title="Decision"
    value={getCommentContent(review, 'note')}
  />
)

const AttachmentsInput = type => ({
  field,
  form: { values },
  updateReview,
  uploadFile,
  review,
}) => [
  <UploadButton
    buttonText="↑ Upload files"
    key="note-attachment"
    onChange={event => {
      const val = event.target.files[0]
      const file = cloneDeep(val)
      file.filename = val.name
      file.type = type

      const { updateIndex, comment } = createComments(
        review,
        { files: [file] },
        type,
      )

      const data = cloneDeep(review)
      set(data, `comments.${updateIndex}`, comment)

      updateReview(data).then(({ data: { updateReview } }) => {
        uploadFile(val, updateReview, type)
      })
    }}
  />,
  <Flexbox>
    {getCommentFiles(review, type).map(val => {
      const file = cloneDeep(val)
      file.name = file.filename
      return <UploadingFile file={file} key={file.name} uploaded />
    })}
  </Flexbox>,
]

const RecommendationInput = journal => ({ field, updateReview, review }) => (
  <RadioGroup
    {...field}
    inline
    onChange={val => {
      const data = cloneDeep(review)
      set(data, 'recommendation', val)
      updateReview(data)
    }}
    options={journal.recommendations}
    value={review.recommendation}
  />
)

const DecisionForm = ({
  journal,
  handleSubmit,
  uploadFile,
  updateReview,
  review,
  isValid,
}) => (
  <form onSubmit={handleSubmit}>
    <AdminSection key="note">
      <div name="note">
        <FieldArray
          component={NoteDecision(updateReview, uploadFile, review)}
          key="comments-array"
          name="comments"
        />
      </div>
    </AdminSection>

    <AdminSection key="recommendation">
      <Field
        component={RecommendationInput(journal)}
        name="decision"
        review={review}
        updateReview={updateReview}
      />
    </AdminSection>

    <AdminSection key="submit">
      <Button disabled={!isValid} primary type="submit">
        Submit
      </Button>
    </AdminSection>
  </form>
)

export default withJournal(DecisionForm)
