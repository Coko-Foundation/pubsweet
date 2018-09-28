import React from 'react'

const MetadataOwners = ({ authors }) => (
  <span>
    {authors.length &&
      authors
        .map(author => (
          <span key={author.user.username}>
            {author.user.username || 'Anonymous'}
          </span>
        ))
        .reduce((prev, curr) => [prev, ', ', curr])}
  </span>
)

export default MetadataOwners
