import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert } from 'react-bootstrap'

import User from './User'

export default class UsersManager extends React.Component {
  componentWillMount () {
    this.props.actions.getUsers()
  }

  render () {
    let { users, actions, error } = this.props

    if (users) {
      users = users.map((user, key) => {
        return (<User
          number={key + 1}
          key={user.id}
          user={user}
          update={actions.updateUser}
        />)
      })
    } else {
      users = []
    }

    return (
      <div className="bootstrap">
        <Grid>
          { error ? <Alert bsStyle="warning">{error}</Alert> : null}
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
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
  users: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string
}
