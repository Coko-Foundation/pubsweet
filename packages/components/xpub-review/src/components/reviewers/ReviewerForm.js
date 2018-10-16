import React from 'react'
import Select from 'react-select'
import { cloneDeep } from 'lodash'
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
  form: { values },
  push,
  replace,
}) => (
  <Select.AsyncCreatable
    {...field}
    // autoload={false}
    filterOption={() => true}
    labelKey="username"
    loadOptions={loadOptions}
    onChange={user => {
      const teamIndex = (values.teams || []).findIndex(
        team => team.role === 'reviewerEditor',
      )

      const member = {
        status: 'invited',
        user,
      }

      if (teamIndex < 0) {
        const team = {
          role: 'reviewerEditor',
          members: [member],
        }
        push(team)
      } else {
        const newTeam = cloneDeep(values.teams[teamIndex])
        newTeam.members.push(member)
        replace(0, newTeam)
      }
    }}
    optionRenderer={OptionRenderer}
    promptTextCreator={label => `Add ${label}?`}
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
    <FieldArray component={componentFields(loadOptions)} name="teams" />

    <Button disabled={!isValid} primary type="submit">
      Invite reviewer
    </Button>
  </form>
)

export default ReviewerForm
