import React from 'react'
import { branch, renderNothing } from 'recompose'
import { FormSection } from 'redux-form'
import { NoteEditor } from 'xpub-edit'
import { ValidatedField } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import { Section } from '../styles'

// TODO: this is only here because prosemirror would save the title in the
// metadata as html instead of plain text. we need to maybe find a better
// position than here to perform this operation
const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

const FundingInput = input => (
  <NoteEditor
    placeholder="Enter an acknowledgment…"
    title="Funding body acknowledgement (required)"
    {...input}
  />
)

const InstructionsInput = input => (
  <NoteEditor
    placeholder="Enter instructions for the editor…"
    title="Special instructions (confidential, to Editors only)"
    {...input}
  />
)

const Notes = ({ readonly }) => (
  <FormSection name="notes">
    <Section id="notes.fundingAcknowledgement">
      <ValidatedField
        component={FundingInput}
        name="fundingAcknowledgement"
        readonly={readonly}
        validate={[required]}
      />
    </Section>

    <Section id="notes.specialInstructions">
      <ValidatedField
        component={InstructionsInput}
        name="specialInstructions"
        parse={stripHtml}
        readonly={readonly}
      />
    </Section>
  </FormSection>
)

export default branch(({ readonly }) => readonly === true, renderNothing)(Notes)
