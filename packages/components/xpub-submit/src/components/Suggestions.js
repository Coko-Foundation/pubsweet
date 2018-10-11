import React from 'react'
import { branch, renderComponent } from 'recompose'
import { FormSection } from 'redux-form'
import { TextField, ValidatedField } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { join, split } from 'xpub-validators'
import { Section, Legend } from '../styles'

const joinComma = join(',')
const splitComma = split(',')

const SuggestedReviewerInput = input => (
  <TextField placeholder="Add reviewer names" {...input} />
)

const OpposedReviewerInput = input => (
  <TextField placeholder="Add reviewer names" {...input} />
)

const SuggestedEditorInput = input => (
  <TextField placeholder="Add editor names" {...input} />
)

const OpposedEditorInput = input => (
  <TextField placeholder="Add editor names" {...input} />
)

const SubLegend = Legend.extend`
  font-weight: normal;
  margin-top: calc(${th('gridUnit')} * 3);
`

const SuggestionsEditable = ({ readonly }) => (
  <FormSection name="suggestions">
    <Section id="suggestions.reviewers">
      <FormSection name="reviewers">
        <Legend>Suggested or opposed reviewers</Legend>

        <div>
          <SubLegend space>Suggested reviewers</SubLegend>

          <ValidatedField
            component={SuggestedReviewerInput}
            format={joinComma}
            name="suggested"
            parse={splitComma}
            readonly={readonly}
          />
        </div>

        <div>
          <SubLegend space>Opposed reviewers</SubLegend>

          <ValidatedField
            component={OpposedReviewerInput}
            format={joinComma}
            name="opposed"
            parse={splitComma}
            readonly={readonly}
          />
        </div>
      </FormSection>
    </Section>

    <Section id="suggestions.editors">
      <FormSection name="editors">
        <Legend>Suggested or opposed editors</Legend>

        <div>
          <SubLegend space>Suggested editors</SubLegend>

          <ValidatedField
            component={SuggestedEditorInput}
            format={joinComma}
            name="suggested"
            parse={splitComma}
            readonly={readonly}
          />
        </div>

        <div>
          <SubLegend space>Opposed editors</SubLegend>

          <ValidatedField
            component={OpposedEditorInput}
            format={joinComma}
            name="opposed"
            parse={splitComma}
            readonly={readonly}
          />
        </div>
      </FormSection>
    </Section>
  </FormSection>
)

const SuggestionsNonEditable = ({ readonly, manuscript }) => {
  const suggestions = manuscript.suggestions || {}

  return [
    <Section id="suggestions.reviewers" key="suggestions.reviewers">
      <Legend>Suggested or opposed reviewers</Legend>
      <SubLegend>Suggested reviewers</SubLegend>
      <div>{suggestionsText(suggestions.reviewers, 'suggested')}</div>
      <SubLegend>Opposed reviewers</SubLegend>
      <div>{suggestionsText(suggestions.reviewers, 'opposed')}</div>
    </Section>,
    <Section id="suggestions.editors" key="suggestions.editors">
      <Legend>Suggested or opposed editors</Legend>
      <SubLegend>Suggested editors</SubLegend>
      <div>{suggestionsText(suggestions.editors, 'suggested')}</div>
      <SubLegend>Opposed editors</SubLegend>
      <div>{suggestionsText(suggestions.editors, 'opposed')}</div>
    </Section>,
  ]
}

const suggestionsText = (source, property) => {
  if (source && Array.isArray(source[property]) && !!source[property].length) {
    return source[property]
  }
  return 'none'
}

export default branch(
  ({ readonly }) => readonly === true,
  renderComponent(SuggestionsNonEditable),
)(SuggestionsEditable)
