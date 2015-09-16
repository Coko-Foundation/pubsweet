import React from 'react'
import ManageActions from 'actions/ManageActions'
import ManageTextInput from 'components/ManageTextInput'

import styles from 'scss/components/_entrybox'

export default class ManageCreate extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  _onSave (text) {
    ManageActions.create(text)
  }

  _onChange (text) {
    ManageActions.typing(text)
  }

  render () {
    return (
      <div className={styles.entrybox}>
        <h1 className={styles.entrybox__header}>Create a new manage</h1>
        <ManageTextInput className={styles.entrybox__input} value={this.props.manage} placeholder="What's your next content?" onChange={this._onChange} onSave={this._onSave} />
      </div>
    )
  }
}

ManageCreate.propTypes = { manage: React.PropTypes.string }
