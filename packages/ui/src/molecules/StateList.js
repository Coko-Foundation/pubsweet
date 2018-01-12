import PropTypes from 'prop-types'
import React from 'react'
import { map, uniqueId, keys, last } from 'lodash'
import { ChevronRight } from 'react-feather'

import classes from './StateList.local.scss'
import StateItem from '../atoms/StateItem'

const StateList = ({ currentValues, update, values }) => {
  const progressIds = keys(values)
  const lastItem = last(progressIds)

  // TODO: Placeholder -- to be implemented with authsome
  const canAct = key => true

  const handleUpdate = (name, index) => {
    update(name, index)
  }

  const items = map(values, (valueList, name) => {
    let delimiter
    const currentValueIndex = currentValues[name]

    if (name !== lastItem) {
      delimiter = <ChevronRight className={classes.delimiter} size={16} />
    }

    return (
      <div className={classes.itemContainer} key={uniqueId()}>
        <StateItem
          disabled={!canAct(name)}
          index={currentValueIndex}
          name={name}
          update={handleUpdate}
          values={valueList}
        />
        {delimiter}
      </div>
    )
  })

  return <div className={classes.stateListContainer}>{items}</div>
}

StateList.propTypes = {
  currentValues: PropTypes.objectOf(PropTypes.number).isRequired,
  update: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default StateList
