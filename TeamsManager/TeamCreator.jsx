import React from 'react'
import { FormControl, Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class TeamCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onFragmentSelect = this.onFragmentSelect.bind(this)
    this.onCollectionSelect = this.onCollectionSelect.bind(this)
    this.onTeamTypeSelect = this.onTeamTypeSelect.bind(this)

    this.state = {
      fragmentSelected: undefined,
      collectionSelected: undefined
    }
  }

  onSave () {
    let name = this.refs.name.getValue()
    let teamType = this.state.teamTypeSelected

    let objectId
    let objectType

    if (this.state.fragmentSelected) {
      objectId = this.state.fragmentSelected
      objectType = 'fragment'
    } else if (this.state.collectionSelected) {
      objectId = this.state.collectionSelected
      objectType = 'collection'
    }

    if (name && teamType && objectId && objectType) {
      this.props.create({
        name: name,
        teamType: this.props.types[teamType],
        object: {
          id: objectId,
          type: objectType
        },
        members: []
      })
    }
  }

  onFragmentSelect (fragment) {
    this.setState({fragmentSelected: fragment})
  }

  onCollectionSelect (collection) {
    this.setState({collectionSelected: collection})
  }

  onTeamTypeSelect (teamType) {
    this.setState({teamTypeSelected: teamType})
  }

  render () {
    const self = this
    self.refs = {}

    let { collections, fragments, types } = this.props

    collections = collections.map(collection => ({value: collection.id, label: collection.title}))
    types = Object.keys(types).map(
      type => (
        {
          value: type,
          label: (types[type].name + ' ' + types[type].permissions)
        }
      )
    )
    fragments = Object.keys(fragments).map(
      id => (
        {
          value: id,
          label: fragments[id].title
        }
      )
    )

    return (
      <div>
        <h3>Create a new team</h3>
        <FormControl
          type="text"
          placeholder="Team Awesome"
          label="Name"
          name="teamName"
          ref={function (c) { self.refs.name = c }}
        />
        <Row>
          <Col md={3}>
            <h4>Team type</h4>
            <Select
              name="teamType"
              options={types}
              value={this.state.teamTypeSelected}
              onChange={this.onTeamTypeSelect}
            />
          </Col>
          <Col md={4}>
            <h4>Fragment</h4>
            <Select
              name="fragment"
              options={fragments}
              value={this.state.fragmentSelected}
              onChange={this.onFragmentSelect}
              disabled={!!this.state.collectionSelected}
            />
          </Col>
          <Col md={1}>
            <br /><br />
            <h3>or</h3>
          </Col>
          <Col md={4}>
            <h4>Collection</h4>
            <Select
              name="collection"
              options={collections}
              value={this.state.collectionSelected}
              onChange={this.onCollectionSelect}
              disabled={!!this.state.fragmentSelected}
            />
          </Col>
        </Row>
        <br />
        <Button bsStyle="primary" onClick={this.onSave} title="Create" aria-label="Create">
          <i className="fa fa-plus" /> Create
        </Button>
      </div>
    )
  }
}

TeamCreator.propTypes = {
  collections: React.PropTypes.array,
  fragments: React.PropTypes.object,
  types: React.PropTypes.object,
  create: React.PropTypes.func
}
