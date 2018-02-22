import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const themeDefaultMaxWidth = 1200
const themeDefaultPaddingSides = 10
const themeDefaultPaddingPercentage =
  themeDefaultPaddingSides * 100 / themeDefaultMaxWidth

const DivContainer = styled.div.attrs({
  role: 'presentation',
})`
  width: ${props => (props.fluid ? 100 : 97)}%;
  max-width: ${themeDefaultMaxWidth}px;
  margin: 0 auto;
  float: none;
  padding: 0 ${themeDefaultPaddingPercentage}%;
  box-sizing: border-box;
`
const SectionContainer = DivContainer.withComponent('section')

const Container = ({ children, className, type, fluid }) => {
  switch (type) {
    case 'section':
      return (
        <SectionContainer className={className} fluid>
          {children}
        </SectionContainer>
      )
    default:
      return (
        <DivContainer className={className} fluid>
          {children}
        </DivContainer>
      )
  }
}

Container.propTypes = {
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
  fluid: PropTypes.bool,
  type: PropTypes.string,
}

Container.defaultProps = {
  className: '',
  fluid: false,
  type: 'div',
}

export default Container
