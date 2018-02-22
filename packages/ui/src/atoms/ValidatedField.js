import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: ${props => props.theme.fontInterface};
  display: block;
  margin-top: calc(${props => props.theme.gridUnit} * -1);
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: ${props => props.theme.subGridUnit};
  }
  font-size: ${props => props.theme.fontSizeBaseSmall};
`

const ErrorMessage = Message.extend`
  color: ${props => props.theme.colorError};
`

const WarningMessage = Message.extend`
  color: ${props => props.theme.colorWarning};
`

const ValidatedFieldComponent = ({ component }) => ({ meta, input }) => {
  let validationStatus
  if (meta.touched) validationStatus = 'success'
  if (meta.touched && meta.error) validationStatus = 'error'
  if (meta.touched && meta.warning) validationStatus = 'warning'

  return (
    <div>
      {component({ ...input, validationStatus })}

      {meta.touched &&
        (meta.error || meta.warning) && (
          <MessageWrapper>
            {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
            {meta.warning && <WarningMessage>{meta.warning}</WarningMessage>}
          </MessageWrapper>
        )}
    </div>
  )
}

const ValidatedField = ({ fieldComponent, ...rest }) => (
  <Field {...rest} component={fieldComponent} />
)

export default compose(
  withHandlers({
    fieldComponent: ValidatedFieldComponent,
  }),
)(ValidatedField)
