import React from 'react'
import { Grid } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

class UsersManager extends React.Component {
  constructor (props) {
    super(props)
    this.actions.getUsers()
  }

  render () {
    let { users } = this.props
    users = users.map((user, key) => {
      return <li>{user}</li>
    })

    return (
      <div className='bootstrap'>
        <Grid>
          <div>
            { users }
          </div>
        </Grid>
      </div>
    )
  }
}

UsersManager.propTypes = {
  users: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    users: state.users
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersManager)
