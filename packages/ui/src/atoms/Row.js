import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const themeDefaultMaxWidth = 1200
const themeDefaultMarginBottom = 10
const themeDefaultMarginPercentage =
  themeDefaultMarginBottom * 100 / themeDefaultMaxWidth

const GenericRow = styled.div.attrs({
  role: 'presentation',
})`
  display: flex;
  flex-flow: row wrap;
  flex: 0 1 auto;
  box-sizing: border-box;
  margin-bottom: ${themeDefaultMarginPercentage}%;
`
const TableRow = GenericRow.withComponent('tr')

const Row = ({ children, className, type }) => {
  switch (type) {
    case 'table':
      return <TableRow className={className}>{children}</TableRow>
    default:
      return <GenericRow className={className}>{children}</GenericRow>
  }
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  type: PropTypes.string,
}
Row.defaultProps = {
  className: '',
  type: 'generic',
}
export default Row
