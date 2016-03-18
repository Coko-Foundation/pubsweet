import React from 'react'
// import TextInput from './TextInput'
import { Input, Button } from 'react-bootstrap'

export default class BlogpostCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave (text) {
    this.props.create({
      kind: 'blogpost',
      title: this.refs.title.getValue(),
      status: 'unpublished',
      version: 1,
      data: ''
    })
  }

  render () {
    return (
      <div>
        <h3>Create a new blog post</h3>
        <Input
          type='text'
          placeholder='One fine day...'
          label='Title'
          ref='title'
        />
        <Button bsStyle='primary' onClick={this.onSave} title='Create' aria-label='Create'>
            <i className='fa fa-plus'></i> Create
        </Button>
      </div>
    )
  }
}

BlogpostCreator.propTypes = {
  create: React.PropTypes.func
}
