import React from 'react'
import { withTheme } from 'styled-components'
import * as reactFeatherIcons from 'react-feather'

const Icon = ({ iconName, className, ...props }) => {
  const DefaultIcon = reactFeatherIcons[iconName]
  return <DefaultIcon className={className} {...props} />
}

export default withTheme(Icon)
