import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import classes from './AlignmentBox.local.scss'

const AlignmentBox = ({ active, id, noBorder, onClick }) => {
  const styles = classNames(classes.root, {
    [classes.active]: active,
    [classes.borderTop]: noBorder.top,
    [classes.borderRight]: noBorder.right,
    [classes.borderBottom]: noBorder.bottom,
    [classes.borderLeft]: noBorder.left,
  })

  return (
    <div className={styles} id={id} onClick={onClick} role="presentation" />
  )
}

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
