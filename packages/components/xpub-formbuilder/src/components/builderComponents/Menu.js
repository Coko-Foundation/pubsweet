import React from 'react'
import { Menu, TextField, ValidatedField } from '@pubsweet/ui'
import { compose, withState, withHandlers } from 'recompose'

const ValidationMenu = input => (
  <div>
    <Menu
      {...input}
      selectElement={value => {
        input.onSelectElement(value)
      }}
    />
    {input.selectelement &&
      input.selectelement !== 'required' && (
        <ValidatedField
          component={TextField}
          label="Min / Max"
          name={`${input.selectelement}.validateValue`}
        />
      )}
  </div>
)

export default compose(
  withState('selectelement', 'changeSelect', undefined),
  withHandlers({
    onSelectElement: ({ changeSelect }) => value => changeSelect(() => value),
  }),
)(ValidationMenu)
