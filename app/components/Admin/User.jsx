import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class User extends React.Component {
  constructor (props) {
    super(props)
  }

  logChange (val) {
    console.log('Selected: ' + val)
  }

  render () {
    let { user, number } = this.props

    let options = user.roles.map(function (role) {
      return { value: role, label: role }
    })

    return (
      <tr className='user'>
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
            name='form-field-name'
            multi='true'
            value={user.roles.join(',')}
            options={options}
            onChange={this.logChange}
          />
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  number: React.PropTypes.number
}

export default User
