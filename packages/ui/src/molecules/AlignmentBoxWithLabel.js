import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

import AlignmentBox from '../atoms/AlignmentBox'

const blue = '#0d78f2'

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Label = styled.span`
  color: ${blue};
  font-family: ${fromTheme('fontInterface')};
  font-size: 16px;
  font-style: italic;
  margin-left: ${props => (props.positionRight ? '10px' : '0')};
  margin-right: ${props => (props.positionRight ? '0' : '10px')};
  order: ${props => (props.positionRight ? '2' : '0')};
`

const AlignmentBoxWithLabel = ({
  active,
  id,
  labelPositionRight,
  labelText,
  noBorder,
  onClick,
}) => (
  <Root>
    <Label positionRight={labelPositionRight}>{labelText}</Label>
    <AlignmentBox
      active={active}
      id={id}
      noBorder={noBorder}
      onClick={onClick}
    />
  </Root>
)

AlignmentBoxWithLabel.propTypes = {
  active: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  labelPositionRight: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  noBorder: PropTypes.shape({
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    right: PropTypes.bool,
    left: PropTypes.bool,
  }),
  onClick: PropTypes.func,
}

AlignmentBoxWithLabel.defaultProps = {
  labelPositionRight: false,
  noBorder: {
    top: false,
    bottom: false,
    right: false,
    left: false,
  },
  onClick: () => null,
}

export default AlignmentBoxWithLabel
