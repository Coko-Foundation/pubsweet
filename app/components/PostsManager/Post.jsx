import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import TextInput from './TextInput'
import styles from './Post.local'
import AuthHelper from '../../helpers/AuthHelper'

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
    const { blogpost, number, auth } = this.props
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
          {blogpost.owner}
        </td>
        <td className={blogpost.published ? 'published' : 'unpublished'}>
          <i className="fa fa-circle" /> ({blogpost.published ? 'Published' : 'Unpublished'}) <br />{blogpost.published_at}
        </td>
        <td>
          { AuthHelper.showForUser(auth, blogpost, 'edit') &&
            <LinkContainer to={`/manage/sciencewriter/${blogpost.id}`}>
              <Button bsStyle="primary" className={styles['button']} title="Edit" aria-label="Edit">
                <i className="fa fa-pencil" />
              </Button>
            </LinkContainer>}

          { AuthHelper.showForUser(auth, blogpost, 'edit') && changePublished }

          { AuthHelper.showForUser(auth, blogpost, 'delete') &&
            <Button bsStyle="danger" className={styles['button']} onClick={this._onDestroyClick} title="Delete" aria-label="Delete">
              <i className="fa fa-trash-o" />
            </Button>
          }
        </td>
      </tr>
    )
  }
}

Blogpost.propTypes = {
  number: React.PropTypes.number,
  blogpost: React.PropTypes.object,
  delete: React.PropTypes.func,
  update: React.PropTypes.func,
  auth: React.PropTypes.object
}
