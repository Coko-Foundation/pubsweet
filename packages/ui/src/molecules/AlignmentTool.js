import React from 'react'
import PropTypes from 'prop-types'

import AlignmentBoxWithLabel from './AlignmentBoxWithLabel'
import classes from './AlignmentTool.local.scss'

const AlignmentTool = ({ data, onClickAlignmentBox }) => {
  const onClick = event => {
    const { id } = event.currentTarget
    onClickAlignmentBox(id)
  }

  const leftData = data[0]
  const rightData = data[1]

  const noBorderRight = { right: true }
  const noBorderLeft = { left: true }

  return (
    <div className={classes.root}>
      <AlignmentBoxWithLabel
        active={leftData.active}
        id={leftData.id}
        labelText={leftData.label}
        noBorder={noBorderRight}
        onClick={onClick}
      />

      <div className={classes.middleLine} />

      <AlignmentBoxWithLabel
        active={rightData.active}
        id={rightData.id}
        labelPositionRight
        labelText={rightData.label}
        noBorder={noBorderLeft}
        onClick={onClick}
      />
    </div>
  )
}

AlignmentTool.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickAlignmentBox: PropTypes.func.isRequired,
}

export default AlignmentTool
