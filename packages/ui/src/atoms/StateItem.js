import PropTypes from 'prop-types'
import styled from 'styled-components'
import React from 'react'

const darkGrey = '#404040'
const lightGrey = '#b3b3b3'

const disabled = `
  color: ${lightGrey};
  cursor: default;

  &:hover {
    color: ${lightGrey};
  }
`

const Root = styled.span`
  cursor: pointer;
  font-family: var(--font-interface);
  font-size: 16px;
  font-style: italic;
  padding: 0;

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${darkGrey};
    transition: 0.25s ease-in-out 0s;
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
