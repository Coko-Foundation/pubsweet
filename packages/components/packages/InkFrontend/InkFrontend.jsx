import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

export default class InkFrontend extends Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    this.props.convert(files[0])
  }

  render() {
    const { ink } = this.props

    return (
      <div className="bootstrap">
        {ink.isFetching ? (
          <Alert bsStyle="info">INK is doing its thing...</Alert>
        ) : null}
        {ink.error ? <Alert bsStyle="danger">INK failed</Alert> : null}

        <Row>
          <Col md={2} mdOffset={5} xs={12}>
            <Dropzone multiple={false} onDrop={this.onDrop}>
              <div>
                Try dropping some files here, or click to select files to
                upload.
              </div>
            </Dropzone>
            {ink.converted ? <span>HERE {ink.converted}</span> : null}
          </Col>
        </Row>
      </div>
    )
  }
}

InkFrontend.propTypes = {
  convert: PropTypes.func,
  ink: PropTypes.object,
}
