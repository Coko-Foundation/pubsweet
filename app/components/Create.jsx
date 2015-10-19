import React from 'react'
import Editor from './SubstanceEditor'

// import { Grid, Row, Col } from 'react-bootstrap'
// import styles from 'scss/components/_create'

export default class Create extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = {
      createId: this.props.params.createId,
      create: this.props.CreateStore.creates.get(this.props.params.createId)
    }
  }

  _onChange (value) {

  }

  render () {
    let value = this.state.create.getIn(['data', 'content'])
    return (
      <Editor value={value} onChange={this._onChange} />
    )
  }
}

Create.propTypes = {
  params: React.PropTypes.object,
  CreateStore: React.PropTypes.object
}

