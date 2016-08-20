import React from 'react'
import { Input, Button, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class TeamCreator extends React.Component {
  constructor (props) {
    super(props)
    this.onSave = this.onSave.bind(this)
  }

  onSave (text) {
    var title = this.refs.title.getValue()
    if (title !== '') {
      this.props.create({
        name: 'blogpost',
        title: title,
        status: 'unpublished',
        version: 1,
        source: undefined
      })
    }
  }

  render () {
    let { collections, fragments, types } = this.props

    return (
      <div>
        <h3>Create a new team</h3>
        <Input
          type="text"
          placeholder="Team Awesome"
          label="Name"
          ref="name"
        />
        <Row>
          <Col md={3}>
            <h4>Team type</h4>
            <Select
              name="type"
              options={Object.keys(types).map(type =>
                ({value: types[type].name, label: (types[type].name + ' ' + types[type].permissions)})
              )}
              ref="type"
            />
          </Col>
          <Col md={4}>
            <h4>Fragment</h4>
            <Select
              name="fragment"
              options={fragments.map(fragment => ({value: fragment.id, label: fragment.title}))}
              ref="fragment"
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
              options={collections.map(collection => ({value: collection.id, label: collection.title}))}
              ref="collection"
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
  fragments: React.PropTypes.array,
  types: React.PropTypes.object,
  create: React.PropTypes.func
}
