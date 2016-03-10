import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default class WaitingRoom extends React.Component {
  render () {
    return (
      <div className='bootstrap'>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <h1>Waiting Room</h1>
            <p>This is the waiting room. You've been sent here because there are no roles associated with your account.</p>
          </Col>
        </Row>
      </div>
    )
  }
}
