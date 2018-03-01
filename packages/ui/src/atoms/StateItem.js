import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import React from 'react'
import fromTheme from '../helpers/fromTheme'

const disabled = css`
  color: ${fromTheme.colorSecondary};
  cursor: default;

  &:hover {
    color: ${fromTheme.colorSecondary};
  }
`

const Root = styled.span`
  cursor: pointer;
  font-family: ${fromTheme.fontInterface};
  font-size: ${fromTheme.fontSizeBaseSmall};
  font-style: italic;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${fromTheme.colorText};
    transition: ${fromTheme.transitionDurationUnit}
      ${fromTheme.transitionTimingFunction};
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
