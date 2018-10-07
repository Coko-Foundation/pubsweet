import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { unescape } from 'lodash'
import ReactHtmlParser from 'react-html-parser'
import * as elements from '@pubsweet/ui'
import * as validators from 'xpub-validators'
import { AbstractEditor } from 'xpub-edit'
import { Heading1, Section, Legend, SubNote } from '../styles'
import AuthorsInput from './AuthorsInput'
import Confirm from './Confirm'

const Wrapper = styled.div`
  font-family: ${th('fontInterface')};
  line-height: 1.3;
  margin: auto;
  max-width: 60em;

  overflow: ${({ confirming }) => confirming && 'hidden'};
`

const Intro = styled.div`
  font-style: italic;
  line-height: 1.4;
`

const ModalWrapper = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

const filterFileManuscript = files =>
  files.filter(
    file =>
      file.type === 'manuscript' &&
      file.mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )

const { ValidatedField, Button, Attachment } = elements
elements.AbstractEditor = ({ validationStatus, ...rest }) => (
  <AbstractEditor {...rest} />
)
elements.AuthorsInput = AuthorsInput

const rejectProps = (obj, keys) =>
  Object.keys(obj)
    .filter(k => !keys.includes(k))
    .map(k => Object.assign({}, { [k]: obj[k] }))
    .reduce(
      (res, o) =>
        Object.values(o).includes('false')
          ? Object.assign({}, res)
          : Object.assign(res, o),
      {},
    )

const link = (journal, version) =>
  String.raw`<a href=/journals/${journal.id}/versions/${
    version.id
  }/manuscript>view here</a>`

const executeFn = formatFn => value =>
  validators[formatFn] ? validators[formatFn]()(value) : value || ''

const createMarkup = encodedHtml => ({
  __html: unescape(encodedHtml),
})

const executeValidate = (vld = [], value = {}) => {
  const validator = vld || []
  if (validator.length === 0) return undefined
  return validator.map(
    validFn =>
      validFn === 'required'
        ? validators[validFn]
        : validators[validFn](value[validFn]),
  )
}

export default ({
  form,
  handleSubmit,
  journal,
  version,
  toggleConfirming,
  confirming,
}) => (
  <Wrapper>
    <Heading1>{form.name}</Heading1>
    <Intro>
      <div>
        {ReactHtmlParser(
          (form.description || '').replace(
            '###link###',
            link(journal, version),
          ),
        )}
      </div>
    </Intro>
    <form onSubmit={handleSubmit}>
      {(form.children || [])
        .sort(
          (obj1, obj2) => parseInt(obj1.order, 10) - parseInt(obj2.order, 10),
        )
        .map(element => (
          <Section
            cssOverrides={JSON.parse(element.sectioncss || '{}')}
            key={`${element.id}`}
          >
            <Legend dangerouslySetInnerHTML={createMarkup(element.title)} />
            <ValidatedField
              component={elements[element.component]}
              format={executeFn(element.format)}
              key={`validate-${element.id}`}
              parse={executeFn(element.parse)}
              readonly={false}
              {...rejectProps(element, [
                'component',
                'title',
                'sectioncss',
                'parse',
                'format',
                'validate',
                'validateValue',
                'description',
                'order',
              ])}
              validate={executeValidate(
                element.validate,
                element.validateValue,
              )}
            />
            <SubNote
              dangerouslySetInnerHTML={createMarkup(element.description)}
            />
          </Section>
        ))}

      {filterFileManuscript(version.files).length && (
        <Section id="files.manuscript">
          <Legend space>Submitted Manuscript</Legend>
          <Attachment
            file={version.files.manuscript}
            key={version.files.manuscript.url}
            uploaded
          />
        </Section>
      )}

      {!version.status === 'submitted' &&
        form.haspopup === 'false' && (
          <Button primary type="submit">
            Submit your manuscript
          </Button>
        )}

      {!version.submitted &&
        form.haspopup === 'true' && (
          <div>
            <Button onClick={toggleConfirming} primary type="button">
              Submit your manuscript
            </Button>
          </div>
        )}
      {confirming && (
        <ModalWrapper>
          <Confirm form={form} toggleConfirming={toggleConfirming} />
        </ModalWrapper>
      )}
    </form>
  </Wrapper>
)
