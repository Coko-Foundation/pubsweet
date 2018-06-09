import React from 'react'

const MetadataOwners = ({ owners }) =>
  owners.map((owner, index) => [
    index === 0 ? null : <span key={owner.username}>, </span>,
    <span key={owner.username}>{owner.username || 'Anonymous'}</span>,
  ])

export default MetadataOwners
