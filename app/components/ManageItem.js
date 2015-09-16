import React from 'react'
import ManageActions from 'actions/ManageActions'

import styles from 'scss/components/_vote'

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
      <li className={styles['manage-item']} key={this.props.id}>
        <span className={styles['manage-item__manage']}>{this.props.title}</span>
        <button className={styles['manage-item__button'] + ' ' + styles['manage-item__button--increment']} onClick={this._onPublish}>+</button>
        <button className={styles['manage-item__button'] + ' ' + styles['manage-item__button--decrement']} onClick={this._onUnpublish}>-</button>
        <button className={styles['manage-item__button'] + ' ' + styles['manage-item__button--destroy']} onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    )
  }
}

ManageItem.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  status: React.PropTypes.string
}
