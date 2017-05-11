import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Row, Col } from 'react-bootstrap'
import { ink } from './actions'
import Dropzone from 'react-dropzone'

import escapeHtml from 'escape-html'

class InkFrontend extends Component {
  constructor (props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  render () {
    const { ink, error } = this.props

    return (
      <div className='bootstrap'>
        { ink.isFetching ? <Alert bsStyle="info">INK is doing its thing...</Alert> : null }
        { error ? <Alert bsStyle="danger">INK failed</Alert> : null }

        <Row>
          <Col xs={12} md={2} mdOffset={5}>
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            { ink.converted ? <span>HERE { escapeHtml(ink.converted)}</span> : null}
          </Col>
        </Row>
      </div>
    )
  }

  onDrop (files) {
    this.props.actions.ink(files[0])
  }
}

InkFrontend.propTypes = {
  actions: PropTypes.object,
  error: PropTypes.string,
  ink: PropTypes.object
}

function mapState (state) {
  return {
    error: state.error,
    ink: state.ink
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ ink }, dispatch)
  }
}

export default connect(
  mapState, mapDispatch
)(InkFrontend)
