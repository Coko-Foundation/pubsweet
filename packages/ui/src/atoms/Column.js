import PropTypes from 'prop-types'
import React from 'react'
import { findIndex, split } from 'lodash'
import styled from 'styled-components'

const themeDefaultPaddingSides = 10
const themeDefaultMaxWidth = 1200
const themeDefaultMarginSides = 20
const themeDefaultMarginPercentage =
  themeDefaultMarginSides * 100 / themeDefaultMaxWidth
const themeDefaultBorder = 1
const themeDefaultPaddingPercentage =
  themeDefaultPaddingSides * 100 / themeDefaultMaxWidth
const stylingPercentage = 2 * themeDefaultMarginPercentage
const screenUnit = 8.333333

const mainGrey = '#666'

const widthFactory = length => {
  const widthPercentage =
    length * (screenUnit - stylingPercentage).toFixed(4) +
    (length - 1) * 2 * themeDefaultMarginPercentage

  if (length <= 0) {
    return `flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  `
  }
  return `flex: 0 0 ${widthPercentage}%;
      max-width: ${widthPercentage}%;
    `
}

const marginFactory = length => {
  if (length > 0) {
    return `margin-left: ${screenUnit * length +
      themeDefaultMarginPercentage}%;`
  }
  return ''
}

const valueExtractor = (screen, values) => {
  if (values === '') return -1
  const index = findIndex(values, item => item.includes(screen))
  if (index === -1) return -1
  const screenArray = split(values[index], '-')
  if (screenArray.length !== 2) return -1

  return parseInt(screenArray[1], 10)
}

const GenericColumn = styled.div.attrs({
  role: 'presentation',
})`
  box-sizing: border-box;
  border: ${themeDefaultBorder}px solid ${mainGrey};
  margin: 0 ${themeDefaultMarginPercentage}%;
  padding: ${themeDefaultPaddingPercentage}%;

  @media only screen and (max-width: 767px) {
    ${props => {
      const allocation = valueExtractor('xs', props.allocations)
      const offset = valueExtractor('xs', props.offsets)
      return `${widthFactory(allocation)} ${marginFactory(offset)}`
    }};
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    ${props => {
      const allocation = valueExtractor('sm', props.allocations)
      const offset = valueExtractor('sm', props.offsets)
      return `${widthFactory(allocation)} ${marginFactory(offset)}`
    }};
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    ${props => {
      const allocation = valueExtractor('md', props.allocations)
      const offset = valueExtractor('md', props.offsets)
      return `${widthFactory(allocation)} ${marginFactory(offset)}`
    }};
  }
  @media only screen and (min-width: 1200px) {
    ${props => {
      const allocation = valueExtractor('lg', props.allocations)
      const offset = valueExtractor('lg', props.offsets)
      return `${widthFactory(allocation)} ${marginFactory(offset)}`
    }};
  }
`

const Column = ({ children, className, allocations, offsets }) => (
  <GenericColumn
    allocations={allocations}
    className={className}
    offsets={offsets}
  >
    {children}
  </GenericColumn>
)

Column.propTypes = {
  allocations: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  offsets: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}
Column.defaultProps = {
  allocations: '',
  className: '',
  offsets: '',
}
export default Column
