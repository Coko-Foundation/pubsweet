import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const HTML = ({ fragment }) =>
  fragment ? (
    <Root dangerouslySetInnerHTML={{ __html: fragment.presentation }}
    />
  ) : (
    <div>No fragment found</div>
  )

HTML.propTypes = {
  // Data
  fragment: PropTypes.object,
  id: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}

export default HTML
