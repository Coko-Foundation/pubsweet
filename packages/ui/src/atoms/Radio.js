import React from 'react'
import classnames from 'classnames'
import classes from './Radio.local.scss'

const Radio = ({
  className,
  color = 'black',
  inline,
  author,
  name,
  value,
  label,
  checked,
  required,
  onChange,
  readonly,
}) => (
  <label
    className={classnames(
      classes.root,
      {
        [classes.author]: author,
        [classes.inline]: inline,
        [classes.checked]: checked,
      },
      className,
    )}
    style={{ color }}
  >
    <input
      checked={checked}
      className={classes.input}
      disabled={readonly}
      name={name}
      onChange={onChange}
      required={required}
      type="radio"
      value={value}
    />{' '}
    <span className={classes.pseudoInput} style={{ color }} />{' '}
    <span className={classes.label}> {label} </span>{' '}
  </label>
)

export default Radio
