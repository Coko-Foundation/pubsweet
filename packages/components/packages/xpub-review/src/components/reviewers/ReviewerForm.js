import React from 'react'
import Select from 'react-select'
import { Field } from 'redux-form'
import { Button } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import 'react-select/dist/react-select.css'

const OptionRenderer = option => (
  <div>
    <div>{option.username}</div>
    <div>{option.email}</div>
  </div>
)

const ReviewerInput = loadOptions => ({ input }) => (
  <Select.AsyncCreatable
    {...input}
    // autoload={false}
    filterOption={() => true}
    labelKey="username"
    loadOptions={loadOptions}
    optionRenderer={OptionRenderer}
    promptTextCreator={label => `Add ${label}?`}
    valueKey="id"
  />
)

const ReviewerForm = ({
  reset,
  valid,
  handleSubmit,
  onSubmit,
  loadOptions,
}) => (
  <form onSubmit={handleSubmit(onSubmit(reset))}>
    <Field
      component={ReviewerInput(loadOptions)}
      name="user"
      validate={required}
    />

    <Button disabled={!valid} primary type="submit">
      Invite reviewer
    </Button>
  </form>
)

export default ReviewerForm