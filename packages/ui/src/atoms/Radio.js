import React from 'react'
import styled, { keyframes } from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const Input = styled.input`
  display: none;
`

const PseudoInput = styled.span`
  display: inline-block;
  content: ' ';
  width: calc(${fromTheme('subGridUnit')} * 2);
  height: calc(${fromTheme('subGridUnit')} * 2);
  vertical-align: center;
  margin-left: ${fromTheme('subGridUnit')};
  margin-right: ${fromTheme('subGridUnit')};

  /* This is not a real border (box-shadow provides that), so not themed as such */
  border: calc(${fromTheme('subGridUnit')} / 4) solid white;
  border-radius: 50%;

  transition: border ${fromTheme('transitionDurationXs')}
    ${fromTheme('transitionTimingFunction')};

  color: ${props => props.color};
`

const Label = styled.span`
  display: inline-block;
  font-family: inherit;
  font-size: ${fromTheme('fontSizeBase')};
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
  transition: all ${fromTheme('transitionDuration')};
  min-height: ${fromTheme('gridUnit')};

  &:not(:last-child) {
    margin-right: ${props => (props.inline ? props.theme.gridUnit : '0')};
    margin-bottom: 0;
  }

  ${PseudoInput} {
    background: ${props => (props.checked ? 'currentcolor' : 'transparent')};
    box-shadow: 0 0 0 ${fromTheme('borderWidth')} currentcolor;
  }

  &:hover {
    ${Label} {
      color: ${props => (props.checked ? 'inherit' : props.theme.colorPrimary)};
    }

    ${PseudoInput} {
      animation-name: ${props => (props.checked ? 'none' : checking)};
      animation-duration: ${fromTheme('transitionDurationS')};
      box-shadow: 0 0 0 ${fromTheme('borderWidth')}
        ${props => (props.checked ? 'currentcolor' : props.theme.colorPrimary)};
    }
  }
  color: ${props => props.color};
`

/* Not used for now
.root.author {
  font-family: ${fromTheme("fontAuthor")};
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
