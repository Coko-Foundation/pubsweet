import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { Button, TextField } from '@pubsweet/ui'

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
    }
  }

  onNameChange(event) {
    this.setState({ teamName: event ? event.target.value : null })
  }

  onCollectionSelect(collection) {
    this.setState({ collectionSelected: collection ? collection.value : null })
  }

  onTeamTypeSelect(teamType) {
    this.setState({ teamTypeSelected: teamType ? teamType.value : null })
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
          type="text"
        />
        <h4>Team type</h4>
        <Select
          name="teamType"
          onChange={this.onTeamTypeSelect}
          options={types}
          required
          value={this.state.teamTypeSelected}
        />
        <h4>Collection</h4>
        <Select
          name="collection"
          onChange={this.onCollectionSelect}
          options={collections}
          required
          value={this.state.collectionSelected}
        />
        <br />
        <Button
          aria-label="Create"
          bsStyle="primary"
          title="Create"
          type="submit"
        >
          <i className="fa fa-plus" /> Create
        </Button>
      </form>
    )
  }
}

TeamCreator.propTypes = {
  collections: PropTypes.array,
  types: PropTypes.object,
  create: PropTypes.func,
}
