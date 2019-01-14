import React from 'react'
import Select from 'react-select'
import { Field, FieldArray } from 'formik'
import { Button } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import 'react-select/dist/react-select.css'

const OptionRenderer = option => (
  <div>
    <div>{option.username}</div>
    <div>{option.email}</div>
  </div>
)

const ReviewerInput = loadOptions => ({
  field,
  form: { values, setFieldValue },
  push,
  replace,
}) => (
  <Select.AsyncCreatable
    {...field}
    filterOption={() => true}
    labelKey="username"
    loadOptions={loadOptions}
    onChange={user => {
      setFieldValue('user', user)
    }}
    optionRenderer={OptionRenderer}
    promptTextCreator={label => `Add ${label}?`}
    value={values.user.id}
    valueKey="id"
  />
)

const componentFields = loadOptions => props => (
  <Field
    component={ReviewerInput(loadOptions)}
    name="user"
    validate={required}
    {...props}
  />
)

const ReviewerForm = ({
  reset,
  isValid,
  handleSubmit,
  onSubmit,
  loadOptions,
}) => (
  <form onSubmit={handleSubmit}>
    <FieldArray component={componentFields(loadOptions)} />

    <Button disabled={!isValid} primary type="submit">
      Invite reviewer
    </Button>
  </form>
)

export default ReviewerForm
