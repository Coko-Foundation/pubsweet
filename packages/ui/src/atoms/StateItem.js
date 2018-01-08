import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import classes from './StateItem.local.scss'

const StateItem = ({ disabled, name, update, values, index }) => {
  const handleInteraction = () => {
    if (disabled) return

    const nextIndex = arrayShift(values, index)
    update(name, nextIndex)
  }

  const arrayShift = (array, i) => (i === array.length - 1 ? 0 : i + 1)

  return (
    <span
      className={classNames(classes.root, {
        [classes.disabled]: disabled,
      })}
      disabled={disabled}
      onClick={handleInteraction}
      onKeyPress={handleInteraction}
      role="button"
      tabIndex="0"
    >
      {values[index]}
    </span>
  )
}

StateItem.propTypes = {
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

StateItem.defaultProps = {
  disabled: false,
}

export default StateItem
