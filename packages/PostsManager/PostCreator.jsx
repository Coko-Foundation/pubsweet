import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'
import FormGroup from 'pubsweet-component-form-group/FormGroup.jsx'
import validations from 'pubsweet-server/src/models/validations.js'

export default class PostCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave (text) {
    var title = ReactDOM.findDOMNode(this.title).value

    if (title !== '') {
      this.props.create({
        kind: 'blogpost',
        title: title,
        status: 'unpublished',
        source: undefined
      })
    }
  }
  render () {
    return (
      <div>
        <h3>Create a new blog post</h3>
        <FormGroup
          controlId='fragment.title'
          label='Title'
          placeholder='One fine day...'
          validations={validations(CONFIG)}
          modelProperty='fragment.title'
          inputRef={(input) => { this.title = input }}
        />
        <Button bsStyle='primary' onClick={this.onSave} title='Create' aria-label='Create'>
          <i className='fa fa-plus' /> Create
        </Button>
      </div>
    )
  }
}
PostCreator.propTypes = {
  create: PropTypes.func
}
