import React from 'react'
import classes from './Radio.local.css'

const Radio = ({ name, value, label, checked, required }) => (
  <label className={classes.root}>
    <input
      className={classes.input}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      required={required}/>
    {label}
  </label>
)

export default Radio
