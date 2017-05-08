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
      var parser = new DOMParser() // eslint-disable-line
      var doc = parser.parseFromString(fragment.source, 'text/html')
      summary = doc.getElementsByTagName('abstract').length > 0 ? doc.getElementsByTagName('abstract')[0].innerText : null
    }
    if (!summary) {
      summary = 'No summary available.'
    }
    let publishDate = new Date(fragment.published_at).toDateString()

    let owners = fragment.owners.map(owner => owner.username).join(', ')

    return (
      <div className="blogpost bootstrap">
        <Row key={fragment.id}>
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
