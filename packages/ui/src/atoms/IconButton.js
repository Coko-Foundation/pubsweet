import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'
import { Button, Icon } from '../atoms'

const UIButton = styled(Button)`
  ${override('ui.IconButton')};
`

const UIIcon = styled(Icon)`
  vertical-align: middle;
  ${override('ui.IconButton.UIIcon')};
`
const ButtonTitle = styled.span`
  vertical-align: middle;
  ${override('ui.IconButton.ButtonTitle')};
`

const IconButton = ({ icon, children, iconPosition, iconsize, ...props }) => (
  <UIButton {...props}>
    {children && iconPosition === 'end' && (
      <ButtonTitle>{children}</ButtonTitle>
    )}
    <UIIcon
      color={props.primary ? th('colorTextReverse') : th('colorPrimary')}
      size={iconsize}
    >
      {icon}{' '}
    </UIIcon>
    {children && iconPosition === 'start' && (
      <ButtonTitle>{children}</ButtonTitle>
    )}
  </UIButton>
)

IconButton.propTypes = {
  /** The contents of the button (text, icon etc.) */
  children: PropTypes.node,
  /** Icon name (An icon name, from the Feather icon set.) */
  icon: PropTypes.string,
  /** Icon Position (Defines the position of the icon (if is is at the start of the button , or at the end)) */
  iconPosition: PropTypes.oneOf(['start', 'end']),
  /** Makes button a primary button */
  primary: PropTypes.bool,
  /** */
  iconsize: PropTypes.number,
}

IconButton.defaultProps = {
  children: null,
  icon: 'plus',
  iconPosition: 'start',
}

export default IconButton
