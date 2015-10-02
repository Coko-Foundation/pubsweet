import React from 'react'
import ManageActions from 'actions/ManageActions'
import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ManageTextInput from 'components/ManageTextInput'
import 'scss/components/_manageItem'

export default class ManageItem extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
    this._onPublish = this._onPublish.bind(this)
    this._onUnpublish = this._onUnpublish.bind(this)
    this._onDestroyClick = this._onDestroyClick.bind(this)
    this._onDoubleClick = this._onDoubleClick.bind(this)

    // this.render = this.render.bind(this)

    this.state = {
      isEditing: false
    }
  }

  _onSave (title) {
    ManageActions.update(this.props.id, {
      title: title,
      status: this.props.status
    })
    this.setState({isEditing: false})
  }

  _onPublish () {
    ManageActions.update(this.props.id, {
      title: this.props.title,
      status: 'published'
    })
  }

  _onUnpublish () {
    ManageActions.update(this.props.id, {
      title: this.props.title,
      status: 'unpublished'
    })
  }

  _onDestroyClick () {
    ManageActions.destroy(this.props.id)
  }

  _onDoubleClick () {
    this.setState({isEditing: true})
  }

  render () {
    var input
    if (this.state.isEditing) {
      input =
        <ManageTextInput
          className='edit'
          onSave={this._onSave}
          value={this.props.title}
        />
    }
    return (
      <div className='manage-item'>
        <Row key={this.props.id}>
          <Col xs={12} md={8}>
            <label onDoubleClick={this._onDoubleClick}>
              {this.props.title} ({this.props.status})
            </label>
            {input}
          </Col>
          <Col xs={12} md={4}>
            <LinkContainer to={`/admin/creates/${this.props.id}`}>
              <Button bsStyle='primary'>Edit</Button>
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

ManageItem.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  status: React.PropTypes.string
}
