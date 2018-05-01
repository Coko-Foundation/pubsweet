import React from 'react'
import { FieldArray } from 'redux-form'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'
import { minSize, readonly } from 'xpub-validators'

const minSize1 = minSize(1)

const firstNameInput = input => (
  <TextField label="First name" placeholder="Enter first name…" {...input} />
)

const lastNameInput = input => (
  <TextField label="Last name" placeholder="Enter last name…" {...input} />
)

const emailAddressInput = input => (
  <TextField
    label="Email address"
    placeholder="Enter email address…"
    {...input}
  />
)

const affiliationInput = input => (
  <TextField label="Affiliation" placeholder="Enter affiliation…" {...input} />
)

const renderAuthors = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <Button onClick={() => fields.push()} plain type="button">
        Add another author
      </Button>
    </li>
    {fields.map((author, index) => (
      <li key={author.email}>
        <Button onClick={() => fields.remove(index)} plain type="button">
          Remove this author
        </Button>

        <div>Author {index + 1}:</div>
        <ValidatedField
          component={firstNameInput}
          name={`${author}.firstName`}
          readonly={readonly}
          required
          validate={[minSize1]}
        />

        <ValidatedField
          component={lastNameInput}
          name={`${author}.lastName`}
          readonly={readonly}
          required
          validate={[minSize1]}
        />

        <ValidatedField
          component={emailAddressInput}
          name={`${author}.email`}
          readonly={readonly}
          required
          validate={[minSize1]}
        />

        <ValidatedField
          component={affiliationInput}
          name={`${author}.affiliation`}
          readonly={readonly}
          required
          validate={[minSize1]}
        />
      </li>
    ))}
  </ul>
)

const AuthorsInput = () => (
  <FieldArray component={renderAuthors} name="authors" />
)

export default AuthorsInput
