import React from 'react'
import { Divider } from '../molecules/Item'

const MetadataStreamLined = ({ streamlinedReview }) => (
  <span>
    {streamlinedReview === 'yes' && <Divider separator="–" />}
    {streamlinedReview === 'yes' ? 'Has streamlined Review' : ''}
  </span>
)

export default MetadataStreamLined
