import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'
import th from '../helpers/themeHelper'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: ${th('fontInterface')};
  display: block;
  margin-top: calc(${th('gridUnit')} * -1);
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: ${th('subGridUnit')};
  }
  font-size: ${th('fontSizeBaseSmall')};
`

const ErrorMessage = Message.extend`
  color: ${th('colorError')};
`

const WarningMessage = Message.extend`
  color: ${th('colorWarning')};
`

const ValidatedFieldComponent = ({ component: Component }) => ({
  meta,
  input,
}) => {
  let validationStatus
  if (meta.touched) validationStatus = 'success'
  if (meta.touched && meta.error) validationStatus = 'error'
  if (meta.touched && meta.warning) validationStatus = 'warning'

  return (
    <div>
      <Component {...input} validationStatus={validationStatus} />

      {/* live region DOM node must be initially present for changes to be announced */}
      <MessageWrapper role="alert">
        {meta.touched &&
          meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        {meta.touched &&
          meta.warning && <WarningMessage>{meta.warning}</WarningMessage>}
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
