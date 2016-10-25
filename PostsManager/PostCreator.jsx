import React from 'react'
import ReactDOM from 'react-dom'
import { FormControl, Button } from 'react-bootstrap'

export default class PostCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave (text) {
    var title = ReactDOM.findDOMNode(this.refs.title).value

    if (title !== '') {
      this.props.create({
        kind: 'blogpost',
        title: title,
        status: 'unpublished',
        version: 1,
        source: undefined
      })
    }
  }
  render () {
    return (
      <div>
        <h3>Create a new blog post</h3>
        <FormControl
          type='text'
          placeholder='One fine day...'
          label='Title'
          ref='title'
        />
        <Button bsStyle='primary' onClick={this.onSave} title='Create' aria-label='Create'>
          <i className='fa fa-plus' /> Create
        </Button>
      </div>
    )
  }
}
PostCreator.propTypes = {
  create: React.PropTypes.func
}
