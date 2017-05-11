import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import TextInput from './TextInput'
import styles from './Post.local'
import Authorize from 'pubsweet-client/src/helpers/Authorize'

export default class Post extends React.Component {
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
    this.props.update(this.props.blog, Object.assign(this.props.blogpost, {
      title: title
    }))
  }

  _onPublish () {
    this.props.update(this.props.blog, Object.assign(this.props.blogpost, {
      published_at: new Date(),
      published: true
    }))
  }

  _onUnpublish () {
    this.props.update(this.props.blog, Object.assign(this.props.blogpost, {
      published: false
    }))
  }

  _onDestroyClick () {
    this.props.delete(this.props.blog, this.props.blogpost)
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
          className="edit"
          onSave={this._onSave}
          value={blogpost.title}
        />
    }

    var changePublished
    if (!blogpost.published) {
      changePublished = <Button title="Publish" aria-label="Publish" bsStyle="success" className={styles['button']} onClick={this._onPublish}>
        <i className="fa fa-paper-plane-o" />
      </Button>
    } else {
      changePublished = <Button title="Unpublish" aria-label="Unpublish" bsStyle="warning" className={styles['button']} onClick={this._onUnpublish}>
        <i className="fa fa-chain-broken" />
      </Button>
    }

    if (blogpost.published_at) {
      blogpost.published_at = new Date(blogpost.published_at).toDateString()
    }

    return (
      <tr key={blogpost.key}>
        <td className="index">
          {number}
        </td>
        <td className="main">
          <label onDoubleClick={this._onDoubleClick}>
            {blogpost.title}
          </label>
          {input}
        </td>
        <td>
          {blogpost.owners.map(owner => owner.username).join(', ')}
        </td>
        <td className={blogpost.published ? 'published' : 'unpublished'}>
          <i className="fa fa-circle" /> ({blogpost.published ? 'Published' : 'Unpublished'}) <br />{blogpost.published_at}
        </td>
        <td>
          <Authorize operation="edit" object={blogpost}>
            <LinkContainer to={`/manage/sciencewriter/${blogpost.id}`}>
              <Button bsStyle="primary" className={styles['button']} title="Edit" aria-label="Edit">
                <i className="fa fa-pencil" />
              </Button>
            </LinkContainer>
          </Authorize>

          <Authorize operation="edit" object={blogpost}>
            {changePublished}
          </Authorize>

          <Authorize operation="delete" object={blogpost}>
            <Button bsStyle="danger" className={styles['button']} onClick={this._onDestroyClick} title="Delete" aria-label="Delete">
              <i className="fa fa-trash-o" />
            </Button>
          </Authorize>
        </td>
      </tr>
    )
  }
}

Post.propTypes = {
  number: PropTypes.number,
  blog: PropTypes.object,
  blogpost: PropTypes.object,
  delete: PropTypes.func,
  update: PropTypes.func
}
