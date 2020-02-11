import React from 'react'
import PropTypes from 'prop-types'
import { th } from '@pubsweet/ui-toolkit'
import { Button, Icon } from '../atoms'

const IconButton = ({ children, icon, ...props }) => (
  <Button {...props}>
    <Icon
      color={props.primary ? th('colorTextReverse') : th('colorPrimary')}
      data-testid="iconButton"
      {...props}
    >
      {icon}{' '}
    </Icon>
  </Button>
)

IconButton.propTypes = {
  /** The contents of the button (text, icon etc.) */
  children: PropTypes.node,
  /** Icon name (An icon name, from the Feather icon set.) */
  icon: PropTypes.string,
  /** Makes button a primary button */
  primary: PropTypes.bool,
}

export default IconButton
