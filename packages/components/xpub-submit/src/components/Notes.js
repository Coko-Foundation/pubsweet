import React from 'react'
import { branch, renderNothing } from 'recompose'
import { FormSection } from 'redux-form'
import { NoteEditor } from 'xpub-edit'
import { withJournal } from 'xpub-journal'
import { ValidatedField } from '@pubsweet/ui'
import { required } from 'xpub-validators'
import { Section, SubNote } from '../styles'

// TODO: this is only here because prosemirror would save the title in the
// metadata as html instead of plain text. we need to maybe find a better
// position than here to perform this operation
const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

const Input = extraProps => input => <NoteEditor {...input} {...extraProps} />

const Notes = ({ readonly, journal }) => (
  <FormSection name="notes">
    <Section id="notes.fundingAcknowledgement">
      <ValidatedField
        component={Input(journal.notes.fundingAcknowledgement)}
        name="fundingAcknowledgement"
        readonly={readonly}
        validate={[required]}
      />
      <SubNote>
        {stripHtml(journal.notes.fundingAcknowledgement.description)}
      </SubNote>
    </Section>

    <Section id="notes.specialInstructions">
      <ValidatedField
        component={Input(journal.notes.specialInstructions)}
        name="specialInstructions"
        parse={stripHtml}
        readonly={readonly}
      />
      <SubNote>
        {stripHtml(journal.notes.specialInstructions.description)}
      </SubNote>
    </Section>
  </FormSection>
)

export default withJournal(
  branch(({ readonly }) => readonly === true, renderNothing)(Notes),
)
