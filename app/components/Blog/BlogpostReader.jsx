import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Blogpost extends React.Component {
  render () {
    const { blogpost } = this.props

    return (
      <div className='blogpost'>
        <Row key={blogpost.id}>
          <Col xs={12} md={8} mdOffset={2}>
            <h2>{blogpost.title}</h2>
            <div dangerouslySetInnerHTML={{__html: blogpost.presentation}}></div>
            <LinkContainer to={`/${blogpost.id}`}><a>Read more</a></LinkContainer>&nbsp;
          </Col>
        </Row>
      </div>
    )
  }
}

Blogpost.propTypes = {
  blogpost: React.PropTypes.object
}
