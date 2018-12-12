import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: ${th('fontInterface')};
  display: block;
  margin-top: calc(${th('gridUnit')} * -3);
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: ${th('gridUnit')};
  }
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
`

const ErrorMessage = styled(Message)`
  color: ${th('colorError')};
`

const ValidatedFieldComponent = ({ component: Component }) => ({
  meta,
  input,
  ...extraProps
}) => {
  let validationStatus
  if (meta.touched) validationStatus = 'success'
  if (meta.touched && meta.error) validationStatus = 'error'
  return (
    <div>
      <Component
        {...extraProps}
        {...input}
        validationStatus={validationStatus}
      />

      {/* live region DOM node must be initially present for changes to be announced */}
      <MessageWrapper role="alert">
        {meta.touched && meta.error && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </MessageWrapper>
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
