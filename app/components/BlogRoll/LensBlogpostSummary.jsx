import React from 'react'
import '../../scss/components/_blogpost'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class LensBlogpostSummary extends React.Component {
  render () {
    const { blogpost } = this.props

    return (
      <div className='blogpost'>
        <Row key={blogpost._id}>
          <Col xs={12} md={8} mdOffset={2}>
            <h2>{blogpost.title}</h2>
            <div dangerouslySetInnerHTML={{__html: blogpost.presentation}}></div>
            <LinkContainer to={`/${blogpost._id}`}><a>Read more</a></LinkContainer>&nbsp;
          </Col>
        </Row>
      </div>
    )
  }
}

LensBlogpostSummary.propTypes = {
  blogpost: React.PropTypes.object
}
