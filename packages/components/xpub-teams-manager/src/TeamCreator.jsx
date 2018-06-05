import React from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, TextField } from '@pubsweet/ui'

export default class TeamCreator extends React.Component {
  constructor(props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onCollectionSelect = this.onCollectionSelect.bind(this)
    this.onTeamTypeSelect = this.onTeamTypeSelect.bind(this)

    this.state = {
      collectionSelected: undefined,
    }
  }

  onSave(event) {
    event.preventDefault()

    const name = this.state.teamName
    const teamType = this.state.teamTypeSelected

    let objectId
    let objectType

    if (this.state.collectionSelected) {
      objectId = this.state.collectionSelected
      objectType = 'collection'
    }

    if (name && teamType && objectId && objectType) {
      this.props.create({
        name,
        teamType: this.props.types[teamType],
        object: {
          id: objectId,
          type: objectType,
        },
        members: [],
      })
      this.setState({
        teamName: '',
        collectionSelected: null,
        teamTypeSelected: null,
      })
    }
  }

  onNameChange(event) {
    this.setState({ teamName: event ? event.target.value : '' })
  }

  onCollectionSelect(collectionId) {
    this.setState({ collectionSelected: collectionId || null })
  }

  onTeamTypeSelect(teamType) {
    this.setState({ teamTypeSelected: teamType || null })
  }

  render() {
    let { collections, types } = this.props

    collections = collections.map(collection => ({
      value: collection.id,
      label: collection.title,
    }))

    types = Object.keys(types).map(type => ({
      value: type,
      label: `${types[type].name} (${types[type].permissions})`,
    }))

    return (
      <form onSubmit={this.onSave}>
        <h3>Create a new team</h3>
        <TextField
          label="Name"
          name="teamName"
          onChange={this.onNameChange}
          placeholder="Team Awesome"
          required
          value={this.state.teamName}
        />
        <h4>Team type</h4>
        <Menu
          name="teamType"
          onChange={this.onTeamTypeSelect}
          options={types}
          required
          value={this.state.teamTypeSelected}
        />
        <h4>Collection</h4>
        <Menu
          name="collection"
          onChange={this.onCollectionSelect}
          options={collections}
          required
          value={this.state.collectionSelected}
        />
        <Button type="submit">Create</Button>
      </form>
    )
  }
}

TeamCreator.propTypes = {
  collections: PropTypes.array,
  types: PropTypes.object,
  create: PropTypes.func,
}
