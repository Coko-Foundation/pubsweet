import React from 'react';
import Immutable from 'immutable';
import ManageItem from 'components/ManageItem';

import styles from 'scss/components/_vote';

export default class ManageList extends React.Component {
  render() {
    const manages = this.props.manages.toKeyedSeq().map((topic, key) => {
      return (<ManageItem id={key} key={key} text={manage.get('title')} />);
    }).toArray();
    return (
      <div className={styles['main-section']}>
        <h3 className={styles['main-section__header']}>Write your stuff</h3>
        <ul className={styles['main-section__list']}>{manages}</ul>
      </div>
    );
  }
}

ManageList.propTypes = { manages: React.PropTypes.instanceOf(Immutable.OrderedMap) };
