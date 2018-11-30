import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import UsersManager from './UsersManager'

function mapStateToProps(state) {
  return {
    users: state.users.users,
    teams: state.teams,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersManager)
