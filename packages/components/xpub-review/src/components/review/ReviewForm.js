import React from 'react'
import styled from 'styled-components'
import { cloneDeep, set } from 'lodash'
import { Field, FieldArray } from 'formik'
import { NoteEditor } from 'xpub-edit'
import {
  Button,
  Flexbox,
  RadioGroup,
  UploadButton,
  UploadingFile,
} from '@pubsweet/ui'

import { withJournal } from 'xpub-journal'
import {
  getCommentFiles,
  getCommentContent,
  stripHtml,
  createComments,
} from './util'
import AdminSection from '../atoms/AdminSection'

const AttachmentsInput = type => ({
  field,
  form: { values },
  updateReview,
  uploadFile,
  review,
}) => [
  <UploadButton
    buttonText="↑ Upload files"
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

const NoteInput = ({ field, form: { values }, review, updateReview }) => (
  <NoteEditor
    placeholder="Enter your review…"
    title="Comments to the Author"
    {...field}
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
    value={getCommentContent(review, 'note')}
  />
)

const ConfidentialInput = ({ field, review, updateReview }) => (
  <NoteEditor
    placeholder="Enter a confidential note to the editor (optional)…"
    title="Confidential Comments to Editor (Optional)"
    {...field}
    onBlur={value => {
      const { updateIndex, comment } = createComments(
        review,
        {
          type: 'confidential',
          content: stripHtml(value),
        },
        'confidential',
      )
      const data = cloneDeep(review)
      set(data, `comments.${updateIndex}`, comment)
      updateReview(data)
    }}
    value={getCommentContent(review, 'confidential')}
  />
)

const RecommendationInput = journal => ({ field, updateReview, review }) => (
  <RadioGroup
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

const ReviewComment = (updateReview, uploadFile, review) => props => [
  <AdminSection>
    <div name="note">
      <Field
        component={NoteInput}
        review={review}
        updateReview={updateReview}
        {...props}
      />
      <Field
        component={AttachmentsInput('note')}
        review={review}
        updateReview={updateReview}
        uploadFile={uploadFile}
        {...props}
      />
    </div>
  </AdminSection>,
  <AdminSection>
    <div name="confidential">
      <Field
        component={ConfidentialInput}
        review={review}
        updateReview={updateReview}
        {...props}
      />
      <Field
        component={AttachmentsInput('confidential')}
        review={review}
        updateReview={updateReview}
        uploadFile={uploadFile}
        {...props}
      />
    </div>
  </AdminSection>,
]

const Title = styled.div``

const ReviewForm = ({
  journal,
  isValid,
  handleSubmit,
  updateReview,
  uploadFile,
  review,
}) => (
  <form onSubmit={handleSubmit}>
    <FieldArray
      component={ReviewComment(updateReview, uploadFile, review)}
      name="comments"
    />
    <AdminSection>
      <div name="Recommendation">
        <Title>Recommendation</Title>
        <Field
          component={RecommendationInput(journal)}
          name="recommendation"
          review={review}
          updateReview={updateReview}
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
