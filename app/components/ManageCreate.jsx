import React from 'react'
import ManageActions from 'actions/ManageActions'
import ManageTextInput from 'components/ManageTextInput'

import styles from 'scss/components/_manageCreate'

export default class ManageCreate extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
  }

  _onSave (text) {
    ManageActions.create(text)
  }

  render () {
    return (
      <div className={styles.entrybox}>
        <h1 className={styles.entrybox__header}>Create a  new blog post</h1>
        <ManageTextInput className={styles.entrybox__input} value={this.props.manage} placeholder='Title' onSave={this._onSave} />
      </div>
    )
  }
}

ManageCreate.propTypes = { manage: React.PropTypes.string }
