import { pick, throttle } from 'lodash'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from 'pubsweet-client'
import uploadFile from 'xpub-upload'

import CurrentVersion from './CurrentVersion'

const onSubmit = (values, dispatch, { project, version }) =>
  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      // rev: version.rev,
      submitted: new Date(),
      ...values,
    }),
  )
    .then(() =>
      dispatch(
        actions.updateCollection({
          id: project.id,
          // rev: project.rev,
          status: 'submitted',
        }),
      ),
    )
    .then(() => {
      dispatch(push('/'))
    })
    .catch(error => {
      if (error.validationErrors) {
        throw new SubmissionError()
      }
    })
// TODO: this is only here because prosemirror would save the title in the
// metadata as html instead of plain text. we need to maybe find a better
// position than here to perform this operation
const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

// TODO: redux-form doesn't have an onBlur handler(?)
const onChange = (values, dispatch, { project, version }) => {
  values.metadata.title = stripHtml(values.metadata.title) // see TODO above
  values.metadata.abstract = stripHtml(values.metadata.abstract) // see TODO above

  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      rev: version.rev,
      // submitted: false,
      ...values,
    }),
  )
}

export default compose(
  connect(
    (state, { match, project, version }) => ({
      project,
      version,
    }),
    {
      uploadFile,
    },
  ),
  withProps(({ version }) => {
    const paths = ['metadata', 'declarations', 'suggestions', 'notes', 'files']

    return {
      initialValues: pick(version, paths),
      readonly: !!version.submitted,
    }
  }),
  reduxForm({
    // enableReinitialize: true,
    form: 'submit',
    onChange: throttle(onChange, 3000, { trailing: false }),
    onSubmit,
  }),
  withState('confirming', 'setConfirming', false),
  withHandlers({
    toggleConfirming: ({ valid, setConfirming, handleSubmit }) => () => {
      if (valid) {
        setConfirming(confirming => !confirming)
      } else {
        // trigger dummy submit to mark all fields as touched
        handleSubmit(() => {})()
      }
    },
  }),
)(CurrentVersion)
