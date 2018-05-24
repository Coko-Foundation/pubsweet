/*
  Actions arose from current designs (like the Appbar) where we had to blend
  links and buttons, but make them appear the same.

  The Action centralizes the visual part of this scenario, while leaving the
  underlying mechanics of links and buttons intact.

  -- TODO
  THIS COULD BE REMOVED IN THE FUTURE, AS IT IS UNCLEAR WHETHER WE SHOULD
  HAVE LINKS AND BUTTONS THAT LOOK THE SAME IN THE FIRST PLACE.
*/

import React from 'react'
import { css } from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

import OriginalButton from '../atoms/Button'
import OriginalLink from '../atoms/Link'

const common = css`
  color: ${th('colorPrimary')};
  font: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  text-decoration: none;
  transition: ${th('transitionDuration')} ${th('transitionTimingFunction')};

  &:hover,
  &:focus,
  &:active {
    background: none;
    color: ${th('colorPrimary')};
    text-decoration: underline;
  }

  ${th('cssOverrides.Action')};
`

const Button = OriginalButton.extend`
  background: none;
  border: none;
  min-width: 0;
  padding: 0;

  ${common};
`

const Link = OriginalLink.extend`
  ${common};
`

const Action = props => {
  if (props.to) return <Link {...props}>{props.children}</Link>
  return <Button {...props}>{props.children}</Button>
}

export default Action
