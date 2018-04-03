import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@pubsweet/ui'

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.state = { title: '' }
  }

  onTitleChange(event) {
    this.setState({ title: event ? event.target.value : '' })
  }

  onSave(event) {
    event.preventDefault()

    const { title } = this.state

    if (title !== '') {
      this.props.create({
        fragmentType: 'blogpost',
        title,
        published: false,
      })
      this.setState({ title: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSave}>
        <h3>Create a new blog post</h3>
        <TextField
          label="Title"
          name="title"
          onChange={this.onTitleChange}
          placeholder="One fine day..."
          required
          value={this.state.title}
        />
        <Button type="submit">Create</Button>
      </form>
    )
  }
}
PostCreator.propTypes = {
  create: PropTypes.func,
}
