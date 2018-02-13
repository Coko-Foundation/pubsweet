import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: var(--font-interface);
  display: block;
  margin-top: calc(var(--grid-unit) * -1);
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--sub-grid-unit);
  }
  font-size: var(--font-size-base-small);
`

const ErrorMessage = Message.extend`
  color: var(--color-error);
`

const WarningMessage = Message.extend`
  color: var(--color-warning);
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
