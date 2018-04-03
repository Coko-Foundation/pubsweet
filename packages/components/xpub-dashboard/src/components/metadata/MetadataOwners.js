import React from 'react'

const MetadataOwners = ({ owners }) => (
  <span>
    {owners.map((owner, index) => [
      index === 0 ? null : <span key={owner.username}>, </span>,
      <span key={owner.username}>{owner.username || 'Anonymous'}</span>,
    ])}
  </span>
)

export default MetadataOwners
