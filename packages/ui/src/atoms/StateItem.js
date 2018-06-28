import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import React from 'react'
import { th } from '@pubsweet/ui-toolkit'

const disabled = css`
  color: ${th('colorSecondary')};
  cursor: default;

  &:hover {
    color: ${th('colorSecondary')};
  }
`

const Root = styled.span`
  cursor: pointer;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  line-height: ${th('lineHeightBaseSmall')};

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${th('colorText')};
    transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};
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
