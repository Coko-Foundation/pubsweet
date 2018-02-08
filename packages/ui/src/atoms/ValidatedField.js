import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: var(--font-writing);
  display: inline-block;
  font-style: italic;
  margin-left: calc(var(--sub-grid-unit) * 4);
  margin-top: var(--sub-grid-unit);
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
