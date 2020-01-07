import PropTypes from 'prop-types'
import React from 'react'
import { map, uniqueId, keys, last } from 'lodash'
import { ChevronRight } from 'react-feather'
import styled from 'styled-components'

import { StateItem } from '../atoms'

const StateListContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const ItemContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Delimiter = styled(ChevronRight).attrs(() => ({ size: 16 }))`
  margin-left: 5px;
  margin-right: 5px;
`

const StateList = ({ currentValues, update, values }) => {
  const progressIds = keys(values)
  const lastItem = last(progressIds)

  // TODO: Placeholder -- to be implemented with authsome
  const canAct = key => true

  const handleUpdate = (currentItem, nextIndex) => {
    update(currentItem, nextIndex)
  }

  const items = map(values, (valueList, currentItem) => {
    const currentValueIndex = currentValues[currentItem]

    return (
      <ItemContainer key={uniqueId()}>
        <StateItem
          disabled={!canAct(currentItem)}
          index={currentValueIndex}
          update={handleUpdate}
          values={valueList}
        />
        {currentItem !== lastItem && <Delimiter />}
      </ItemContainer>
    )
  })

  return <StateListContainer>{items}</StateListContainer>
}

StateList.propTypes = {
  currentValues: PropTypes.objectOf(PropTypes.number).isRequired,
  update: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default StateList
