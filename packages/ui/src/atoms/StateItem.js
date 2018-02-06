import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const disabled = `
  color: var(--color-secondary);
  cursor: default;

  &:hover {
    color: var(--color-secondary);
  }
`

const Root = styled.span`
  cursor: pointer;
  font-family: var(--font-interface);
  font-size: var(--font-size-base-small);
  font-style: italic;

  &:focus {
    outline: none;
  }

  &:hover {
    color: var(--color-text);
    transition: var(--transition-duration-unit)
      var(--transition-timing-function);
  }

  ${props => (props.disabled ? disabled : '')};
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
