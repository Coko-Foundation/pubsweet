import uuid from 'uuid'
import { find, some } from 'lodash'
import { compose, withHandlers } from 'recompose'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import ReviewerForm from './ReviewerForm'

const getProjectReviewer = (props, user) => {
  const reviewer = find(props.project.reviewers, { user: user.id })

  return reviewer ? Promise.resolve(reviewer) : addProjectReviewer(props, user)
}

const addProjectReviewer = (props, user) => {
  const reviewer = {
    id: uuid(),
    user: user.id,
  }

  return props
    .updateProject({
      id: props.project.id,
      rev: props.project.rev,
      reviewers: (props.project.reviewers || []).concat(reviewer),
    })
    .then(() => reviewer)
}

const addReviewer = (props, projectReviewer, dispatch) => {
  const version = Object.assign({}, props.version)
  const reviewer = {
    events: {
      invited: new Date().toString(),
    },
    id: uuid(),
    reviewer: projectReviewer.id,
    status: 'invited',
  }

  version.reviewers = (props.version.reviewers || []).concat(reviewer)

  return dispatch(actions.inviteReviewer(props.project, version))
  //return reviewer
  // console.log({
  //   id: props.version.id,
  //   rev: props.version.rev,
  //   reviewers: (props.version.reviewers || []).concat(reviewer),
  // },"222222222222222222222222222")
  // return props
  //   .updateVersion(props.project, {
  //     id: props.version.id,
  //     rev: props.version.rev,
  //     reviewers: (props.version.reviewers || []).concat(reviewer),
  //   })
  //   .then(() => reviewer)
}

const handleSubmit = props => reset => (values, dispatch) =>
  // TODO: create a u ser account if values.user.id is null

  getProjectReviewer(props, values.user)
    .then(projectReviewer => {
      if (some(props.version.reviewers, { reviewer: projectReviewer.id })) {
        throw new SubmissionError('This reviewer has already been added')
      }

      return addReviewer(props, projectReviewer, dispatch)
    })
    .then(() => reset())

const loadOptions = props => input => {
  const options = props.reviewerUsers

  // TODO: put existing, uninvited project reviewers at the top

  // TODO: filter users based on input

  return Promise.resolve({ options })
}

export default compose(
  connect(null, {
    updateProject: actions.updateCollection,
    updateVersion: actions.updateFragment,
  }),
  withHandlers({
    loadOptions: props => loadOptions(props),
    onSubmit: props => handleSubmit(props),
  }),
  reduxForm({
    form: 'reviewers',
  }),
)(ReviewerForm)
