/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './Summary.scss'

const Summary = props => {
  const { fragment } = props
  let summary = 'No summary available.'
  if (fragment.source) {
    const parser = new DOMParser() // eslint-disable-line
    const doc = parser.parseFromString(fragment.source, 'text/html')
    const [abstract] = doc.getElementsByTagName('abstract')
    summary = abstract ? abstract.innerText : null
  }
  const publishDate = new Date(fragment.published_at).toDateString()
  const owners = fragment.owners.map(owner => owner.username).join(', ')

  return (
    <div className="blogpost bootstrap">
      <Row>
        <Col md={8} mdOffset={2} xs={12}>
          <h2>{fragment.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
          <LinkContainer to={`/${fragment.id}`}>
            <a>Read more</a>
          </LinkContainer>
          &nbsp;
          <div>
            <em>
              Published by {owners} on {publishDate}.
            </em>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Summary.propTypes = {
  fragment: PropTypes.object.isRequired,
}

export default Summary
