import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from 'pubsweet-client'
import { newestFirst, selectCurrentUser } from 'xpub-selectors'
import { ConnectPage } from 'xpub-connect'
import { uploadManuscript } from '../redux/conversion'
import Dashboard from './Dashboard'

const reviewerResponse = (project, version, reviewer, status) => dispatch => {
  reviewer.status = status

  return dispatch(
    actions.updateFragment(project, {
      id: version.id,
      rev: version.rev,
      reviewers: version.reviewers,
    }),
  )
}

export default compose(
  ConnectPage(() => [
    actions.getCollections(),
    actions.getTeams(),
    actions.getUsers(),
  ]),
  connect(
    state => {
      const { collections } = state
      // const { conversion, teams } = state
      const { conversion } = state
      const currentUser = selectCurrentUser(state)

      const dashboard = newestFirst(collections)

      return { collections, conversion, currentUser, dashboard }
    },
    (dispatch, { history }) => ({
      deleteProject: collection =>
        dispatch(actions.deleteCollection(collection)),
      reviewerResponse: (project, version, reviewer, status) =>
        dispatch(reviewerResponse(project, version, reviewer, status)),
      uploadManuscript: acceptedFiles =>
        dispatch(uploadManuscript(acceptedFiles, history)),
    }),
  ),
  withRouter,
)(Dashboard)
