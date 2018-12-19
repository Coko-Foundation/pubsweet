import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import TeamsManager from './TeamsManager'

function mapStateToProps(state) {
  return {
    collections: state.collections,
    teams: state.teams,
    users: state.users.users,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsManager)
