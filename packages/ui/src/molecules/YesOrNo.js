import React from 'react'
import RadioGroup from './RadioGroup'
import Colorize from '../atoms/Colorize'

const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const YesOrNo = ({ name, value, required, onChange, color = 'black' }) => (
  <RadioGroup
    inline
    name={name}
    onChange={onChange}
    options={options.map(el => ({ ...el, color }))}
    required={required}
    value={value}
  />
)

export default Colorize(YesOrNo)
