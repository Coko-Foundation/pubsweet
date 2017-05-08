import React from 'react'
import ReactDOM from 'react-dom'
import { FormControl, Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class TeamCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
    this.onCollectionSelect = this.onCollectionSelect.bind(this)
    this.onTeamTypeSelect = this.onTeamTypeSelect.bind(this)

    this.state = {
      collectionSelected: undefined
    }
  }

  onSave () {
    let name = ReactDOM.findDOMNode(this.refs.name).value
    let teamType = this.state.teamTypeSelected

    let objectId
    let objectType

    if (this.state.collectionSelected) {
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

  onCollectionSelect (collection) {
    this.setState({collectionSelected: collection ? collection.value : null})
  }

  onTeamTypeSelect (teamType) {
    this.setState({teamTypeSelected: teamType ? teamType.value : null})
  }

  render () {
    let { collections, types } = this.props

    collections = collections.map(collection => ({
      value: collection.id,
      label: collection.title
    }))

    types = Object.keys(types).map(type => ({
      value: type,
      label: `${types[type].name} (${types[type].permissions})`
    }))

    return (
      <div>
        <h3>Create a new team</h3>
        <FormControl
          type='text'
          placeholder='Team Awesome'
          label='Name'
          name='teamName'
          ref='name'
        />
        <Row>
          <Col md={3}>
            <h4>Team type</h4>
            <Select
              name='teamType'
              options={types}
              value={this.state.teamTypeSelected}
              onChange={this.onTeamTypeSelect}
            />
          </Col>
          <Col md={9}>
            <h4>Collection</h4>
            <Select
              name='collection'
              options={collections}
              value={this.state.collectionSelected}
              onChange={this.onCollectionSelect}
            />
          </Col>
        </Row>
        <br />
        <Button bsStyle='primary' onClick={this.onSave} title='Create' aria-label='Create'>
          <i className='fa fa-plus' /> Create
        </Button>
      </div>
    )
  }
}

TeamCreator.propTypes = {
  collections: React.PropTypes.array,
  types: React.PropTypes.object,
  create: React.PropTypes.func
}
