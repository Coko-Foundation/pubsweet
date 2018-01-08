import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import AlignmentBox from '../atoms/AlignmentBox'
import classes from './AlignmentBoxWithLabel.local.scss'

const AlignmentBoxWithLabel = ({
  active,
  id,
  labelPositionRight,
  labelText,
  noBorder,
  onClick,
}) => {
  const styles = classNames(classes.root, {
    [classes.reverseOrder]: labelPositionRight,
  })

  return (
    <div className={styles}>
      <span className={classes.label}>{labelText}</span>
      <AlignmentBox
        active={active}
        id={id}
        noBorder={noBorder}
        onClick={onClick}
      />
    </div>
  )
}

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
