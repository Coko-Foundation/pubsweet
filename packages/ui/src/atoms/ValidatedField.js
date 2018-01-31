import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: var(--font-author);
  display: inline-block;
  font-style: italic;
  margin-left: 1em;
  margin-top: 10px;
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  font-size: 0.9em;
  letter-spacing: 0.01em;
`

const ErrorMessage = Message.extend`
  color: var(--color-danger);
`

const WarningMessage = Message.extend`
  color: var(--color-warning);
`

const ValidatedFieldComponent = ({ component }) => ({ meta, input }) => (
  <div>
    {component(input)}

    {meta.touched &&
      (meta.error || meta.warning) && (
        <MessageWrapper>
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
          {meta.warning && <WarningMessage>{meta.warning}</WarningMessage>}
        </MessageWrapper>
      )}
  </div>
)

const ValidatedField = ({ fieldComponent, ...rest }) => (
  <Field {...rest} component={fieldComponent} />
)

export default compose(
  withHandlers({
    fieldComponent: ValidatedFieldComponent,
  }),
)(ValidatedField)
