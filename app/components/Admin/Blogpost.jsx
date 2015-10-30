import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import TextInput from './TextInput'
import '../../scss/components/_blogpost'

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
      status: 'published'
    }))
  }

  _onUnpublish () {
    this.props.update(Object.assign(this.props.blogpost, {
      status: 'unpublished'
    }))
  }

  _onDestroyClick () {
    this.props.delete(this.props.blogpost)
  }

  _onDoubleClick () {
    this.setState({isEditing: true})
  }

  render () {
    const { blogpost } = this.props
    var input
    if (this.state.isEditing) {
      input =
        <TextInput
          className='edit'
          onSave={this._onSave}
          value={blogpost.title}
        />
    }
    return (
      <div className='blogpost'>
        <Row key={blogpost._id}>
          <Col xs={12} md={8}>
            <label onDoubleClick={this._onDoubleClick}>
              {blogpost.title} ({blogpost.status})
            </label>
            {input}
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to={`/admin/editor/${blogpost._id}`}>
              <Button bsStyle='primary'>Edit this</Button>
            </LinkContainer>&nbsp;
            <Button bsStyle='success' onClick={this._onPublish}>Publish</Button>&nbsp;
            <Button bsStyle='warning' onClick={this._onUnpublish}>Unpublish</Button>&nbsp;
            <Button bsStyle='danger' onClick={this._onDestroyClick}>Delete</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

Blogpost.propTypes = {
  blogpost: React.PropTypes.object,
  delete: React.PropTypes.func,
  update: React.PropTypes.func
}
