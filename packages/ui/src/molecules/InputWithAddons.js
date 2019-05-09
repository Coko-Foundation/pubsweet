import React from 'react'

import { Button, TextField } from '../atoms'

const InputWithAddons = ({ addons, inputProps, ...props }) => (
  <div {...props}>
    <TextField {...inputProps} />
    {addons.map((itemConfig, index) => (
      <Button
        key={itemConfig.buttonProps.key || index}
        {...itemConfig.buttonProps}
      >
        {' '}
        {itemConfig.icon}{' '}
      </Button>
    ))}
  </div>
)

export default InputWithAddons
