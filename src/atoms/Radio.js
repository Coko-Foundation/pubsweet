import React from 'react'
import classnames from 'classnames'
import classes from './Radio.local.css'

const Radio = ({ inline, name, value, label, checked, required, onChange }) => (
  <label className={classnames(classes.root, {
    [classes.inline]: inline
  })}>
    <input
      className={classes.input}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      required={required}
      onChange={onChange}/>
    {label}
  </label>
)

export default Radio
