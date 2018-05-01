import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions } from 'pubsweet-client'
import uploadFile from 'xpub-upload'
import { ConnectPage } from 'xpub-connect'
import {
  selectCollection,
  // selectFragments,
  selectCurrentVersion,
  selectLastDecidedVersion,
} from 'xpub-selectors'
import Submit from './Submit'

export default compose(
  ConnectPage(({ match }) => [
    actions.getCollection({ id: match.params.project }),
    actions.getFragments({ id: match.params.project }),
  ]),
  connect(
    (state, { match }) => {
      const project = selectCollection(state, match.params.project)
      // const version = selectFragments(state, (project || {}).fragments || [])
      const currentVersion = selectCurrentVersion(state, project)
      const submittedVersion = selectLastDecidedVersion(state, project)

      return { project, submittedVersion, currentVersion }
    },
    {
      uploadFile,
    },
  ),
)(Submit)
