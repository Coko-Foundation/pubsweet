import './Summary.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Summary extends React.Component {
  render () {
    const { fragment } = this.props
    let summary
    if (fragment.source) {
      const parser = new DOMParser() // eslint-disable-line
      const doc = parser.parseFromString(fragment.source, 'text/html')
      const [abstract] = doc.getElementsByTagName('abstract')
      summary = abstract ? abstract.innerText : null
    }
    if (!summary) {
      summary = 'No summary available.'
    }
    const publishDate = new Date(fragment.published_at).toDateString()
    const owners = fragment.owners.map(owner => owner.username).join(', ')

    return (
      <div className="blogpost bootstrap">
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <h2>{fragment.title}</h2>
            <div dangerouslySetInnerHTML={{__html: summary}} />
            <LinkContainer to={`/${fragment.id}`}><a>Read more</a></LinkContainer>&nbsp;
            <div><em>Published by {owners} on {publishDate}.</em></div>
          </Col>
        </Row>
      </div>
    )
  }
}

Summary.propTypes = {
  fragment: PropTypes.object.isRequired
}
