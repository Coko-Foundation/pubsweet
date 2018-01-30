import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const lightGrey = '#b3b3b3'
const mainGrey = '#666'
const whiteRGBA = 'rgba(255, 255, 255, 1)'

const Root = styled.div.attrs({
  role: 'presentation',
})`
  box-shadow: inset 0 0 0 2px ${whiteRGBA};
  cursor: pointer;
  height: 26px;
  width: 17px;

  border-style: solid;
  border-color: ${mainGrey};
  border-top-width: ${props => (props.noBorder.top ? 0 : 1)}px;
  border-right-width: ${props => (props.noBorder.right ? 0 : 1)}px;
  border-bottom-width: ${props => (props.noBorder.bottom ? 0 : 1)}px;
  border-left-width: ${props => (props.noBorder.left ? 0 : 1)}px;

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
