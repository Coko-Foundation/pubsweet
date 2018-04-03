import React from 'react'

const MetadataOwners = ({ owners }) =>
  owners.map(owner => (
    <span key={owner.id}>{owner.username || 'Anonymous'}</span>
  ))

export default MetadataOwners
