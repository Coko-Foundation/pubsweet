import React from 'react'
import styled, { keyframes } from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Input = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -1;
`

const PseudoInput = styled.span`
  display: inline-block;
  content: ' ';
  width: calc(${th('gridUnit')} * 2);
  height: calc(${th('gridUnit')} * 2);
  vertical-align: center;
  margin-left: ${th('gridUnit')};
  margin-right: ${th('gridUnit')};

  /* This is not a real border (box-shadow provides that), so not themed as such */
  border: calc(${th('gridUnit')} / 4) solid white;
  border-radius: 50%;

  transition: border ${th('transitionDuration')}
    ${th('transitionTimingFunction')};

  color: ${props => props.color};
`

const Label = styled.span`
  display: inline-block;
  font-family: inherit;
  font-size: ${th('fontSizeBase')};
  font-style: italic;
`

const checking = keyframes`
  0% {
    transform: scale(0.8);
  }
  20% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`

const Root = styled.label`
  align-items: center;
  cursor: pointer;
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  transition: all ${th('transitionDuration')};
  min-height: calc(${th('gridUnit')} * 3);

  &:not(:last-child) {
    margin-right: ${props =>
      props.inline ? `calc(${props.theme.gridUnit} * 3)` : '0'};
    margin-bottom: 0;
  }

  ${PseudoInput} {
    background: ${props => (props.checked ? 'currentcolor' : 'transparent')};
    box-shadow: 0 0 0 ${th('borderWidth')} currentcolor;
  }

  &:hover {
    ${Label} {
      color: ${props => (props.checked ? 'inherit' : props.theme.colorPrimary)};
    }

    ${PseudoInput} {
      animation-name: ${props => (props.checked ? 'none' : checking)};
      animation-duration: ${th('transitionDuration')};
      box-shadow: 0 0 0 ${th('borderWidth')}
        ${props => (props.checked ? 'currentcolor' : props.theme.colorPrimary)};
    }
  }

  ${Input}:focus + ${PseudoInput} {
    box-shadow: 0 0 ${th('borderWidth')} calc(${th('borderWidth')} * 2)
      ${th('colorPrimary')};
  }

  color: ${props => props.color};

  ${override('ui.Radio')};
`

/* Not used for now
.root.author {
  font-family: ${th("fontAuthor")};
}

.root.author span {
  font-size: 1.3em;
  text-transform: lowercase;
}
*/

const Radio = ({
  className,
  color = 'black',
  inline,
  name,
  value,
  label,
  checked,
  required,
  onChange,
  readonly,
}) => (
  <Root checked={checked} color={color} inline={inline}>
    <Input
      checked={checked}
      disabled={readonly}
      name={name}
      onChange={onChange}
      required={required}
      type="radio"
      value={value}
    />{' '}
    <PseudoInput color={color} /> <Label> {label} </Label>{' '}
  </Root>
)

export default Radio
