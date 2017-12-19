import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Authorize from 'pubsweet-client/src/helpers/Authorize'
import TextInput from './TextInput'
import styles from './Post.local.scss'

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onPublish = this.onPublish.bind(this)
    this.onUnpublish = this.onUnpublish.bind(this)
    this.onDestroyClick = this.onDestroyClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)

    this.state = {
      isEditing: false,
    }
  }

  onSave(title) {
    this.props.update(
      this.props.blog,
      Object.assign(this.props.blogpost, {
        title,
      }),
    )
  }

  onPublish() {
    this.props.update(
      this.props.blog,
      Object.assign(this.props.blogpost, {
        published_at: new Date(),
        published: true,
      }),
    )
  }

  onUnpublish() {
    this.props.update(
      this.props.blog,
      Object.assign(this.props.blogpost, {
        published: false,
      }),
    )
  }

  onDestroyClick() {
    this.props.delete(this.props.blog, this.props.blogpost)
  }

  onDoubleClick() {
    this.setState({ isEditing: true })
  }

  render() {
    const { blogpost, number } = this.props
    let input
    if (this.state.isEditing) {
      input = (
        <TextInput
          className="edit"
          onSave={this.onSave}
          value={blogpost.title}
        />
      )
    }

    let changePublished
    if (!blogpost.published) {
      changePublished = (
        <Button
          aria-label="Publish"
          bsStyle="success"
          className={styles.button}
          onClick={this.onPublish}
          title="Publish"
        >
          <i className="fa fa-paper-plane-o" />
        </Button>
      )
    } else {
      changePublished = (
        <Button
          aria-label="Unpublish"
          bsStyle="warning"
          className={styles.button}
          onClick={this.onUnpublish}
          title="Unpublish"
        >
          <i className="fa fa-chain-broken" />
        </Button>
      )
    }

    if (blogpost.published_at) {
      blogpost.published_at = new Date(blogpost.published_at).toDateString()
    }

    return (
      <tr key={blogpost.key}>
        <td className="index">{number}</td>
        <td className="main">
          <label onDoubleClick={this.onDoubleClick}>{blogpost.title}</label>
          {input}
        </td>
        <td>{blogpost.owners.map(owner => owner.username).join(', ')}</td>
        <td className={blogpost.published ? 'published' : 'unpublished'}>
          <i className="fa fa-circle" /> ({blogpost.published
            ? 'Published'
            : 'Unpublished'}) <br />
          {blogpost.published_at}
        </td>
        <td>
          <Authorize object={blogpost} operation="PATCH">
            <LinkContainer to={`/manage/sciencewriter/${blogpost.id}`}>
              <Button
                aria-label="Edit"
                bsStyle="primary"
                className={styles.button}
                title="Edit"
              >
                <i className="fa fa-pencil" />
              </Button>
            </LinkContainer>
          </Authorize>

          <Authorize object={blogpost} operation="PATCH">
            {changePublished}
          </Authorize>

          <Authorize object={blogpost} operation="DELETE">
            <Button
              aria-label="Delete"
              bsStyle="danger"
              className={styles.button}
              onClick={this.onDestroyClick}
              title="Delete"
            >
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
  update: PropTypes.func,
}
