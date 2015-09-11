import React from 'react';
import ManageActions from 'actions/ManageActions';

import styles from 'scss/components/_vote';

export default class ManageItem extends React.Component {
  _onPublish = () => {
    ManageActions.publish(this.props.id);
  }

  _onUnpublish = () => {
    ManageActions.unpublish(this.props.id);
  }

  _onDestroyClick = () => {
    ManageActions.destroy(this.props.id);
  }

  render() {
    return (
      <li className={styles['topic-item']} key={this.props.id}>
        <span className={styles['topic-item__topic']}>{this.props.text}</span>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--increment']} onClick={this._onPublish}>+</button>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--decrement']} onClick={this._onUnpublish}>-</button>
        <button className={styles['topic-item__button'] + ' ' + styles['topic-item__button--destroy']} onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  }
}

ManageItem.propTypes = {
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  status: React.PropTypes.string
};
