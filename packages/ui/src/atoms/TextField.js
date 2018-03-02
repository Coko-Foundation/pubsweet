import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(${fromTheme('gridUnit')} * 14);
  margin-bottom: ${props => (props.inline ? '0' : props.theme.gridUnit)};
`

const Label = styled.label`
  font-size: ${fromTheme('fontSizeBaseSmall')};
  display: block;
`

const borderColor = ({ theme, validationStatus = 'default' }) =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    warning: theme.colorWarning,
    default: theme.colorBorder,
  }[validationStatus])

const Input = styled.input`
  border: ${fromTheme('borderWidth')} ${fromTheme('borderStyle')} ${borderColor};

  border-radius: ${fromTheme('borderRadius')};

  font-family: inherit;
  font-size: inherit;

  padding: 0 calc(${fromTheme('gridUnit')} / 2);
  height: calc(${fromTheme('gridUnit')} * 2);

  &::placeholder {
    color: ${fromTheme('colorTextPlaceholder')};
  }
`

const TextField = ({
  label,
  name,
  placeholder,
  required,
  type = 'text',
  value = '',
  onBlur,
  onChange,
  onKeyDown,
  readonly,
  validationStatus,
  inline,
}) => (
  <Root inline={inline}>
    {label && <Label>{label}</Label>}
    <Input
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      readOnly={readonly}
      required={required}
      type={type}
      validationStatus={validationStatus}
      value={value}
    />
  </Root>
)

export default TextField
