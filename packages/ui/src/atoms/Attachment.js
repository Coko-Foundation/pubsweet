import React from 'react'
import Icon from './Icon'
import classes from './Attachment.local.scss'

const Attachment = ({ value }) => (
  <a className={classes.root} download={value.name} href={value.url}>
    <span className={classes.icon}>
      <Icon color="var(--color-local)">paperclip</Icon>
    </span>
    <span className={classes.filename}>{value.name}</span>
  </a>
)

export default Attachment
