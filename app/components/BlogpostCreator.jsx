import React from 'react'
import TextInput from './TextInput'

import styles from '../scss/components/_blogpostCreator'

export default class BlogpostCreator extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
  }

  _onSave (text) {
    this.props.create(text)
  }

  render () {
    return (
      <div className={styles.entrybox}>
        <h1 className={styles.entrybox__header}>Create a new blog post</h1>
        <TextInput className={styles.entrybox__input} placeholder='Title' onSave={this._onSave} />
      </div>
    )
  }
}

BlogpostCreator.propTypes = {
  create: React.PropTypes.func
}
