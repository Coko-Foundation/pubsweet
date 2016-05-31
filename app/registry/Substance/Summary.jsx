import './styles/Summary.scss'

import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Summary extends React.Component {
  render () {
    const { fragment } = this.props
    let summary
    if (fragment.source) {
      summary = fragment.source.nodes
      if (summary && summary[1]) {
        summary = summary[1].abstract
      }
    }
    if (!summary) {
      summary = 'No summary available.'
    }
    let publishDate = new Date(fragment.published_at).toDateString()

    return (
      <div className='blogpost bootstrap'>
        <Row key={fragment.id}>
          <Col xs={12} md={8} mdOffset={2}>
            <h2>{fragment.title}</h2>
            <div><em>Published by {fragment.owner} on {publishDate}.</em></div>
            <div dangerouslySetInnerHTML={{__html: summary}}></div>
            <LinkContainer to={`/${fragment.id}`}><a>Read more</a></LinkContainer>&nbsp;
          </Col>
        </Row>
      </div>
    )
  }
}

Summary.propTypes = {
  fragment: React.PropTypes.object.isRequired,
  blogpost: React.PropTypes.object
}
