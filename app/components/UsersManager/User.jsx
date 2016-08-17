import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class User extends React.Component {
  update (val) {
    console.log('Selected: ' + val)
    var user = Object.assign(this.props.user, { roles: val.split(',') })
    this.props.update(user)
  }

  render () {
    let { user, number } = this.props

    let options = [
      { value: 'admin', label: 'admin' },
      { value: 'contributor', label: 'contributor' },
      { value: 'reader', label: 'reader' }
    ]

    return (
      <tr className="user">
        <td>
          {number}
        </td>
        <td>
          {user.username}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          <Select
            name="form-field-name"
            multi
            value={user.roles.join(',')}
            options={options}
            onChange={this.update}
          />
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  number: React.PropTypes.number,
  update: React.PropTypes.func.isRequired
}

export default User
