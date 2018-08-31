import { pick, throttle } from 'lodash'
import { compose, withProps, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import uploadFile from 'xpub-upload'
import {
  selectCollection,
  selectFragment,
  selectCurrentVersion,
  selectLastDecidedVersion,
} from 'xpub-selectors'

import Submit from './Submit'

const onSubmit = (values, dispatch, { project, version }) =>
  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      submitted: new Date(),
      ...values,
    }),
  )
    .then(() =>
      dispatch(
        actions.updateCollection({
          id: project.id,
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

const onChange = (values, dispatch, { project, version }) => {
  values.metadata.title = stripHtml(values.metadata.title) // see TODO above
  values.metadata.abstract = stripHtml(values.metadata.abstract || '') // see TODO above

  dispatch(
    actions.updateFragment(project, {
      id: version.id,
      ...values,
    }),
  )
}

export default compose(
  ConnectPage(({ match }) => [
    actions.getForm('submit'),
    actions.getCollection({ id: match.params.project }),
    actions.getFragments({ id: match.params.project }),
  ]),
  connect(
    (state, { match }) => {
      const project = selectCollection(state, match.params.project)
      const version = selectFragment(state, match.params.version)
      const currentVersion = selectCurrentVersion(state, project)
      const submittedVersion = selectLastDecidedVersion(state, project)
      const { forms } = state

      return {
        project,
        submittedVersion,
        currentVersion,
        version,
        forms: forms.forms,
      }
    },
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
    form: 'submit',
    onChange: throttle(onChange, 3000, { trailing: true }),
    onSubmit,
    enableReinitialize: true,
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: true,
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
)(Submit)
