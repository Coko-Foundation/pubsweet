import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const lightGrey = '#b3b3b3'
const mainGrey = '#666'
const whiteRGBA = 'rgba(255, 255, 255, 1)'

const borderRule = position => props => `
    border-${position}-width: ${props.noBorder[position] ? '0' : '1px'}
  `

const Root = styled.div.attrs({
  role: 'presentation',
})`
  box-shadow: inset 0 0 0 2px ${whiteRGBA};
  cursor: pointer;
  height: 26px;
  width: 17px;

  border-style: solid;
  border-color: ${mainGrey};
  ${borderRule('top')};
  ${borderRule('right')};
  ${borderRule('bottom')};
  ${borderRule('left')};

  background-color: ${props => (props.active ? mainGrey : 'transparent')};

  &:hover {
    background-color: ${lightGrey};
  }
`

const AlignmentBox = ({ active, id, noBorder, onClick }) => (
  <Root active={active} id={id} noBorder={noBorder} onClick={onClick} />
)

AlignmentBox.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  noBorder: PropTypes.shape({
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    right: PropTypes.bool,
    left: PropTypes.bool,
  }),
  onClick: PropTypes.func,
}

AlignmentBox.defaultProps = {
  noBorder: {
    top: false,
    bottom: false,
    right: false,
    left: false,
  },
  onClick: () => null,
}

export default AlignmentBox
