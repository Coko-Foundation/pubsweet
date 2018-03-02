import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Field } from 'redux-form'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

// TODO: pass ...props.input to children automatically?

const MessageWrapper = styled.div`
  font-family: ${fromTheme('fontInterface')};
  display: block;
  margin-top: calc(${fromTheme('gridUnit')} * -1);
`

const Message = styled.div`
  &:not(:last-child) {
    margin-bottom: ${fromTheme('subGridUnit')};
  }
  font-size: ${fromTheme('fontSizeBaseSmall')};
`

const ErrorMessage = Message.extend`
  color: ${fromTheme('colorError')};
`

const WarningMessage = Message.extend`
  color: ${fromTheme('colorWarning')};
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
