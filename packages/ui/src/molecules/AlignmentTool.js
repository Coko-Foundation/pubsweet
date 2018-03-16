import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AlignmentBoxWithLabel } from '../molecules'

const mainGrey = '#666'

const Root = styled.div`
  display: flex;
  margin-left: auto;
`

const MiddleLine = styled.div`
  background-color: ${mainGrey};
  height: 40px;
  width: 1px;
`

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
    <Root>
      <AlignmentBoxWithLabel
        active={leftData.active}
        id={leftData.id}
        labelText={leftData.label}
        noBorder={noBorderRight}
        onClick={onClick}
      />

      <MiddleLine />

      <AlignmentBoxWithLabel
        active={rightData.active}
        id={rightData.id}
        labelPositionRight
        labelText={rightData.label}
        noBorder={noBorderLeft}
        onClick={onClick}
      />
    </Root>
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
