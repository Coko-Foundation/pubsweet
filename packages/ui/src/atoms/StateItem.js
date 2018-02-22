import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import React from 'react'

const disabled = css`
  color: ${props => props.theme.colorSecondary};
  cursor: default;

  &:hover {
    color: ${props => props.theme.colorSecondary};
  }
`

const Root = styled.span`
  cursor: pointer;
  font-family: ${props => props.theme.fontInterface};
  font-size: ${props => props.theme.fontSizeBaseSmall};
  font-style: italic;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${props => props.theme.colorText};
    transition: ${props => props.theme.transitionDurationUnit}
      ${props => props.theme.transitionTimingFunction};
  }

  ${props => props.disabled && disabled};
`

const StateItem = ({ update, disabled, values, index }) => {
  const callUpdateWithNextIndex = () => {
    if (disabled) return
    const nextIndex = arrayShift(values, index)
    update(values[index], nextIndex)
  }

  const arrayShift = (array, i) => (i === array.length - 1 ? 0 : i + 1)

  return (
    <Root
      disabled={disabled}
      onClick={callUpdateWithNextIndex}
      onKeyPress={callUpdateWithNextIndex}
      role="button"
      tabIndex="0"
    >
      {values[index]}
    </Root>
  )
}

StateItem.propTypes = {
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

StateItem.defaultProps = {
  disabled: false,
}

export default StateItem
