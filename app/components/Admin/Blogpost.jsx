import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import TextInput from './TextInput'
import '../../scss/components/Admin/blogpost'

export default class Blogpost extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
    this._onPublish = this._onPublish.bind(this)
    this._onUnpublish = this._onUnpublish.bind(this)
    this._onDestroyClick = this._onDestroyClick.bind(this)
    this._onDoubleClick = this._onDoubleClick.bind(this)

    this.state = {
      isEditing: false
    }
  }

  _onSave (title) {
    this.props.update(Object.assign(this.props.blogpost, {
      title: title
    }))
  }

  _onPublish () {
    this.props.update(Object.assign(this.props.blogpost, {
      published_at: new Date(),
      published: true
    }))
  }

  _onUnpublish () {
    this.props.update(Object.assign(this.props.blogpost, {
      published: false
    }))
  }

  _onDestroyClick () {
    this.props.delete(this.props.blogpost)
  }

  _onDoubleClick () {
    this.setState({isEditing: true})
  }

  render () {
    const { blogpost, number } = this.props
    var input
    if (this.state.isEditing) {
      input =
        <TextInput
          className='edit'
          onSave={this._onSave}
          value={blogpost.title}
        />
    }

    var changePublished
    if (!blogpost.published) {
      changePublished = <Button title='Publish' aria-label='Publish' bsStyle='success' onClick={this._onPublish}>
          <i className='fa fa-chain'></i>
        </Button>
    } else {
      changePublished = <Button title='Unpublish' aria-label='Unpublish' bsStyle='warning' onClick={this._onUnpublish}>
          <i className='fa fa-chain-broken'></i>
        </Button>
    }

    if (blogpost.published_at) {
      blogpost.published_at = new Date(blogpost.published_at).toDateString()
    }

    return (
      <tr className='blogpost' key={blogpost.key}>
        <td>
          {number}
        </td>
        <td>
          <label onDoubleClick={this._onDoubleClick}>
            {blogpost.title}
          </label>
          {input}
        </td>
        <td>
          {blogpost.owner}
        </td>
        <td>
          {blogpost.published_at} ({blogpost.published ? 'published' : 'unpublished'})
        </td>
        <td>
          <LinkContainer to={`/admin/editor/${blogpost._id}`}>
            <Button bsStyle='primary' title='Edit' aria-label='Edit'>
              <i className='fa fa-pencil'></i>
            </Button>
          </LinkContainer>&nbsp;
          {changePublished}&nbsp;
          <Button bsStyle='danger' onClick={this._onDestroyClick} title='Delete' aria-label='Delete'>
            <i className='fa fa-trash-o'></i>
          </Button>
        </td>
      </tr>
    )
  }
}

Blogpost.propTypes = {
  number: React.PropTypes.number,
  blogpost: React.PropTypes.object,
  delete: React.PropTypes.func,
  update: React.PropTypes.func
}
