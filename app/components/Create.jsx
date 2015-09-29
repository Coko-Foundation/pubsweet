import React from 'react'
import Editor from 'components/Editor'
import CreateActions from 'actions/CreateActions'
import { Grid, Row, Col } from 'react-bootstrap'
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
    const data = this.state.create.setIn(['data', 'content'], value).toJS()
    CreateActions.update(data.id, data.data)
  }

  render () {
    let value = this.state.create.getIn(['data', 'content'])
    return (
      <Grid><Row><Col xs={12}>
        <Editor value={value} onChange={this._onChange} />
      </Col></Row></Grid>
    )
  }
}

Create.propTypes = {
  params: React.PropTypes.object,
  CreateStore: React.PropTypes.object
}

