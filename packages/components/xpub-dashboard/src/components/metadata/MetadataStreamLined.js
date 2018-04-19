import React from 'react'
import { Divider } from '../molecules/Item'

const MetadataStreamLined = ({ streamlinedReview }) => (
  <span>
    {streamlinedReview === 'yes' ? 'Streamlined' : ''}
    {streamlinedReview === 'yes' && <Divider separator="–" />}
  </span>
)

export default MetadataStreamLined
