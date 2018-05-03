import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Button, EditableValue } from '@pubsweet/ui'

import Authorize from 'pubsweet-client/src/helpers/Authorize'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.onUpdateTitle = this.onUpdateTitle.bind(this)
    this.onPublish = this.onPublish.bind(this)
    this.onUnpublish = this.onUnpublish.bind(this)
    this.onDestroyClick = this.onDestroyClick.bind(this)
    this.onDoubleClick = this.onDoubleClick.bind(this)

    this.state = {
      isEditing: false,
    }
  }

  onUpdateTitle(title) {
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

    let changePublished
    if (!blogpost.published) {
      changePublished = (
        <Button onClick={this.onPublish} plain>
          Publish
        </Button>
      )
    } else {
      changePublished = (
        <Button onClick={this.onUnpublish} plain>
          Unpublish
        </Button>
      )
    }

    if (blogpost.published_at) {
      blogpost.published_at = new Date(blogpost.published_at).toDateString()
    }

    return (
      <tr key={blogpost.key}>
        <td>{number}</td>
        <td>
          <EditableValue
            onSave={this.onUpdateTitle}
            required
            value={this.props.blogpost.title}
          />
        </td>
        <td>{blogpost.authors.join(', ')}</td>
        <td>
          {blogpost.published ? 'Published' : 'Unpublished'} <br />
          {blogpost.published_at}
        </td>
        <td>
          <Authorize object={blogpost} operation="PATCH">
            <Button
              onClick={() =>
                this.props.history.push(`/manage/sciencewriter/${blogpost.id}`)
              }
              plain
            >
              Edit
            </Button>
          </Authorize>

          <Authorize object={blogpost} operation="PATCH">
            {changePublished}
          </Authorize>

          <Authorize object={blogpost} operation="DELETE">
            <Button onClick={this.onDestroyClick} plain>
              Delete
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

export default withRouter(Post)
