import React from 'react'
import { FieldArray } from 'redux-form'
import { TextField, ValidatedField, Button } from '@pubsweet/ui'
import { required, minSize } from 'xpub-validators'

const minSize1 = minSize(1)

const firstNameInput = ({ input }) => {
  <div>
    <TextField
      placeholder={'Enter first name…'}
      label={'First name'}
      {...input}
    />
  </div>
}

const lastNameInput = ({ input }) => {
  <div>
    <TextField
      placeholder={'Enter last name…'}
      label={'Last name'}
      {...input}
    />
  </div>
}

const emailAddressInput = ({ input }) => {
  <div>
    <TextField
      placeholder={'Enter email address…'}
      label={'Email address'}
      {...input}
    />
  </div>
}

const affiliationInput = ({ input }) => {
  <div>
    <TextField
      placeholder={'Enter affiliation…'}
      label={'Affiliation'}
      {...input}
    />
  </div>
}

const renderAuthors = ({ authors }) => {
  <ul>
    <li>
      <Button onClick={() => authors.push()} plain type="button">
        Add another author
      </Button>
    </li>
    {authors.map((author, index) => (
      <li key={index}>
        <Button onClick={() => authors.remove(index)} plain type="button">
          Remove this author
        </Button>

        <div>Author #{index + 1}</div>

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
}

const AuthorsInput = () => {
  return <FieldArray name="authors" component={renderAuthors} />
}

export default AuthorsInput
