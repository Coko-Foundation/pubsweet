import React from 'react'
import ManageActions from 'actions/ManageActions'
import { Button, Row, Col } from 'react-bootstrap'
import styles from 'scss/components/_manageItem'

export default class ManageItem extends React.Component {
  constructor (props) {
    super(props)
    this._onPublish = this._onPublish.bind(this)
    this._onUnpublish = this._onUnpublish.bind(this)
    this._onDestroyClick = this._onDestroyClick.bind(this)
    this.render = this.render.bind(this)
  }

  _onPublish () {
    ManageActions.publish(this.props.id)
  }

  _onUnpublish () {
    ManageActions.unpublish(this.props.id)
  }

  _onDestroyClick () {
    ManageActions.destroy(this.props.id)
  }

  render () {
    return (
      <Row className={styles['manage-item']} key={this.props.id}>
        <Col xs={12} md={8}><span className={styles['manage-item__manage']}>{this.props.title}</span></Col>
        <Col xs={12} md={4}>
          <Button bsStyle='primary'>Edit</Button>&nbsp;
          <Button bsStyle='success' onClick={this._onPublish}>Publish</Button>&nbsp;
          <Button bsStyle='warning' onClick={this._onUnpublish}>Unpublish</Button>&nbsp;
          <Button bsStyle='danger' onClick={this._onDestroyClick}>Delete</Button>
        </Col>
      </Row>
    )
  }
}

ManageItem.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  status: React.PropTypes.string
}
