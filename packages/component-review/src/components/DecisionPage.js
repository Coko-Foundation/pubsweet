import { debounce, pick } from 'lodash'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions } from 'pubsweet-client'
import { ConnectPage } from 'xpub-connect'
import { selectCollection, selectCurrentVersion, selectFragment,
  selectFragments } from 'xpub-selectors'
import uploadFile from 'xpub-upload'
import DecisionLayout from './decision/DecisionLayout'

// TODO: this should happen on the server
const handleDecision = (project, version) => dispatch => {
  return dispatch(actions.updateFragment(project, {
    id: version.id,
    decision: version.decision
  })).then(() => {
    console.log(version)

    switch (version.decision.recommendation) {
      case 'accept':
        return dispatch(actions.updateCollection({
          id: project.id,
          status: 'accepted'
        }))

      case 'reject':
        return dispatch(actions.updateCollection({
          id: project.id,
          status: 'rejected'
        }))

      case 'revise':
        const cloned = pick(
          version,
          ['source', 'metadata', 'declarations', 'suggestions', 'files', 'notes']
        )

        return dispatch(actions.updateCollection({
          id: project.id,
          status: 'revise'
        })).then(() => dispatch(actions.createFragment(project, {
          fragmentType: 'version',
          created: new Date(), // TODO: set on server
          ...cloned,
          version: version.version + 1,
        })))

      default:
        throw new Error('Unknown decision type')
    }
  })
}

const onSubmit = (values, dispatch, { project, version }) => {
  console.log('submit', values)

  version.decision = {
    ...version.decision,
    ...values,
    submitted: new Date(),
    status: 'submitted'
  }

  return dispatch(handleDecision(project, version)).then(() => {
    // TODO: show "thanks for your review" message
    dispatch(push('/'))
  }).catch(error => {
    if (error.validationErrors) {
      throw new SubmissionError()
    }
  })
}

const onChange = (values, dispatch, { project, version }) => {
  console.log('change', values)

  version.decision = {
    ...version.decision,
    ...values
  }

  return dispatch(actions.updateFragment(project, {
    id: version.id,
    decision: version.decision
  }))

  // TODO: display a notification when saving/saving completes/saving fails
}

export default compose(
  ConnectPage(({params}) => [
    actions.getCollection({id: params.project}),
    actions.getFragments({id: params.project}),
  ]),
  connect(
    (state, { params }) => {
      const project = selectCollection(state, params.project)
      const versions = selectFragments(state, project.fragments)
      const version = selectFragment(state, params.version)
      const currentVersion = selectCurrentVersion(state, project)

      return { project, versions, version, currentVersion }
    },
    {
      uploadFile
    }
  ),
  withProps(({decision}) => {
    return {
      initialValues: decision
    }
  }),
  reduxForm({
    form: 'decision',
    onSubmit,
    onChange: debounce(onChange, 1000, { maxWait: 5000 })
  })
)(DecisionLayout)
