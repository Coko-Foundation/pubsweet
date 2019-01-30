/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@pubsweet/ui'

const Summary = props => {
  const { fragment } = props
  let summary = 'No summary available.'
  if (fragment.source) {
    const parser = new DOMParser() // eslint-disable-line
    const doc = parser.parseFromString(fragment.source, 'text/html')
    const [abstract] = doc.getElementsByTagName('abstract')
    summary = abstract ? abstract.innerText : null
  }
  const publishDate = new Date(fragment.created).toDateString()
  const owners = fragment.owners.map(owner => owner.username).join(', ')

  return (
    <div>
      <h2>{fragment.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: summary }} />
      <Link to={`/${fragment.id}`}>
        <a>Read more</a>
      </Link>
      &nbsp;
      <div>
        <em>
          Published by {owners} on {publishDate}.
        </em>
      </div>
    </div>
  )
}

Summary.propTypes = {
  fragment: PropTypes.object.isRequired,
}

export default Summary
