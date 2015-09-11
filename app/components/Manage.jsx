import React from 'react';

import MainSection from 'components/ManageList';

import styles from 'scss/components/_vote';

export default class Manage extends React.Component {

  render() {
    return (
      <div className={styles.vote}>
        <MainSection topics={this.props.ManageStore.manages} />
      </div>
    );
  }
}

Manage.propTypes = {
  ManageStore: React.PropTypes.object
};
