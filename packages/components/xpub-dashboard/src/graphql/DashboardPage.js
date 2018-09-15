import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from 'pubsweet-client'
import { newestFirst, selectCurrentUser } from 'xpub-selectors'
import { ConnectPage } from 'xpub-connect'
import config from 'config'
import {
  uploadManuscript,
  uploadManuscriptNoConversion,
} from '../redux/conversion'
import Dashboard from '../components/Dashboard'

const { acceptUploadFiles } = config['pubsweet-component-xpub-dashboard'] || {}

const acceptFiles =
  acceptUploadFiles.length > 0
    ? acceptUploadFiles.join()
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

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

      return {
        acceptFiles,
        collections,
        conversion,
        currentUser,
        dashboard,
      }
    },
    (dispatch, { history }) => ({
      deleteProject: collection => {
        collection.fragments.map(fragment =>
          dispatch(actions.deleteFragment(collection, { id: fragment })),
        )
        dispatch(actions.deleteCollection(collection))
      },
      reviewerResponse: (project, version, reviewer, status) =>
        dispatch(reviewerResponse(project, version, reviewer, status)),
      uploadManuscript: acceptedFiles => {
        if (
          acceptedFiles[0].type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          dispatch(uploadManuscript(acceptedFiles, history))
        } else {
          dispatch(uploadManuscriptNoConversion(acceptedFiles, history))
        }
      },
    }),
  ),
  withRouter,
)(Dashboard)
