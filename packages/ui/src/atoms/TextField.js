import React from 'react'
import styled from 'styled-components'
import { th, override, validationColor } from '@pubsweet/ui-toolkit'
import { useUID } from 'react-uid'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props =>
    props.inline ? '0' : `calc(${props.theme.gridUnit} * 3)`};
  ${override('ui.TextField')};
`

const Label = styled.label`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  display: block;
  ${override('ui.Label')};
  ${override('ui.TextField.Label')};
`

const Input = styled.input`
  border: ${th('borderWidth')} ${th('borderStyle')} ${validationColor};

  border-radius: ${th('borderRadius')};

  font-family: inherit;
  font-size: inherit;

  padding: 0 ${th('gridUnit')};
  height: calc(${th('gridUnit')} * 6);

  &::placeholder {
    color: ${th('colorTextPlaceholder')};
  }

  ${override('ui.TextField.Input')};
`

const TextField = props => {
  const uid = useUID()
  const {
    innerRefProp,
    className,
    label,
    type = 'text',
    value = '',
    readonly,
    inline,
    ...rest
  } = props

  return (
    <Root className={className} inline={inline}>
      {label && <Label htmlFor={uid}>{label}</Label>}
      <Input
        id={uid}
        readOnly={readonly}
        ref={innerRefProp}
        type={type}
        value={value}
        {...rest}
      />
    </Root>
  )
}

export default TextField
