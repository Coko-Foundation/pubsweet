import React from 'react'
import { Grid } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'

import User from '../../components/Admin/User'

class UsersManager extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.actions.getUsers()
  }

  render () {
    let { users } = this.props

    if (users) {
      users = users.map((user, key) => {
        return (<User number={key + 1} key={user._id} user={user}/>)
      })
    }

    return (
      <div className='bootstrap'>
        <Grid>
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Permissions</th>
                </tr>
              </thead>
              <tbody>
                { users }
              </tbody>
            </table>
          </div>
        </Grid>
      </div>
    )
  }
}

UsersManager.propTypes = {
  users: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    users: state.users.users
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
