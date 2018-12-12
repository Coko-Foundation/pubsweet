import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { unescape, groupBy, isArray, get, cloneDeep } from 'lodash'
import { FieldArray } from 'formik'
import ReactHtmlParser from 'react-html-parser'
import * as elements from '@pubsweet/ui'
import * as validators from 'xpub-validators'
import { AbstractEditor } from 'xpub-edit'
import { Heading1, Section, Legend, SubNote } from '../styles'
import AuthorsInput from './AuthorsInput'
// import Notes from './Notes'
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

// Due to migration to new Data Model
// Attachement component needs different data structure to work
// needs to change the pubsweet ui Attachement to support the new Data Model
const filesToAttachment = file => ({
  name: file.filename,
  url: file.url,
})

const stripHtml = htmlString => {
  const temp = document.createElement('span')
  temp.innerHTML = htmlString
  return temp.textContent
}

const filterFileManuscript = files =>
  files.filter(
    file =>
      file.type === 'manuscript' &&
      file.mimeType !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )

const {
  ValidatedFieldFormik,
  Button,
  Attachment,
  UploadingFile,
  FileUploadList,
} = elements
elements.AbstractEditor = ({
  validationStatus,
  setTouched,
  onChange,
  value,
  ...rest
}) => (
  <AbstractEditor
    value={value || ''}
    {...rest}
    onChange={val => {
      setTouched(createObject(rest.name, true))
      onChange(stripHtml(val))
    }}
  />
)

elements.SupplementaryFiles = props => (
  <FileUploadList
    {...props}
    buttonText="↑ Upload files"
    FileComponent={UploadingFile}
    files={cloneDeep(props.value)
      .map(val => {
        val.name = val.filename
        return val
      })
      .filter(val => val.type === 'supplementary')}
  />
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

const link = (journal, manuscript) =>
  String.raw`<a href=/journals/${journal.id}/versions/${
    manuscript.id
  }/manuscript>view here</a>`

const createMarkup = encodedHtml => ({
  __html: unescape(encodedHtml),
})

const composeValidate = (vld = [], valueField = {}) => value => {
  const validator = vld || []
  if (validator.length === 0) return undefined
  const errors = []
  validator.map(validatorFn => {
    const error =
      validatorFn === 'required'
        ? validators[validatorFn](value)
        : validators[validatorFn](valueField[validatorFn])(value)
    if (error) {
      errors.push(error)
    }
    return validatorFn
  })
  return errors.length > 0 ? errors[0] : undefined
}

const createObject = (key, value) => {
  const obj = {}
  const parts = key.split('.')
  if (parts.length === 1) {
    obj[parts[0]] = value
  } else if (parts.length > 1) {
    // concat all but the first part of the key
    const remainingParts = parts.slice(1, parts.length).join('.')
    obj[parts[0]] = createObject(remainingParts, value)
  }
  return obj
}

const groupElements = elements => {
  const grouped = groupBy(elements, n => n.group || 'default')

  Object.keys(grouped).forEach(element => {
    grouped[element].sort(
      (obj1, obj2) => parseInt(obj1.order, 10) - parseInt(obj2.order, 10),
    )
  })

  let startArr = grouped.default
  delete grouped.default

  Object.keys(grouped).forEach(element => {
    const { order } = grouped[element][0]
    const first = startArr.findIndex(elem => elem.order === order)
    startArr = startArr
      .slice(0, first)
      .concat([grouped[element]])
      .concat(startArr.slice(first)) // eslint-disable-line no-use-before-define
  })
  return startArr
}

const renderArray = (
  elementsComponentArray,
  setFieldValue,
  setTouched,
  onChange,
) => ({ form: { values }, name }) =>
  get(values, name).map((elValues, index) => {
    const element = elementsComponentArray.find(elv =>
      Object.values(elValues).includes(elv.type),
    )
    return (
      <Section
        cssOverrides={JSON.parse(element.sectioncss || '{}')}
        key={`${element.id}`}
      >
        <Legend dangerouslySetInnerHTML={createMarkup(element.title)} />
        <ValidatedFieldFormik
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
          component={elements[element.component]}
          key={`notes-validate-${element.id}`}
          name={`${name}.${index}.${element.name}`}
          onChange={value => {
            setFieldValue(`${name}.[${index}].${element.name}`, value, true)
            onChange(value, `${name}.${index}.${element.name}`)
          }}
          readonly={false}
          setTouched={setTouched}
          validate={composeValidate(element.validate, element.validateValue)}
        />
        <SubNote dangerouslySetInnerHTML={createMarkup(element.description)} />
      </Section>
    )
  })

const ElementComponentArray = ({
  elementsComponentArray,
  setFieldValue,
  setTouched,
  onChange,
}) => (
  <FieldArray
    name={elementsComponentArray[0].group}
    render={renderArray(
      elementsComponentArray,
      setFieldValue,
      setTouched,
      onChange,
    )}
  />
)

export default ({
  form,
  handleSubmit,
  journal,
  toggleConfirming,
  confirming,
  manuscript,
  setTouched,
  setFieldValue,
  uploadFile,
  onChange,
  onSubmit,
}) => (
  <Wrapper>
    <Heading1>{form.name}</Heading1>
    <Intro>
      <div>
        {ReactHtmlParser(
          (form.description || '').replace(
            '###link###',
            link(journal, manuscript),
          ),
        )}
      </div>
    </Intro>
    <form onSubmit={handleSubmit}>
      {groupElements(form.children || []).map(element =>
        !isArray(element) ? (
          <Section
            cssOverrides={JSON.parse(element.sectioncss || '{}')}
            key={`${element.id}`}
          >
            <Legend dangerouslySetInnerHTML={createMarkup(element.title)} />
            {element.component === 'AuthorsInput' && <AuthorsInput />}
            {element.component !== 'AuthorsInput' && (
              <ValidatedFieldFormik
                component={elements[element.component]}
                key={`validate-${element.id}`}
                name={element.name}
                onChange={value => {
                  const val = value.target ? value.target.value : value
                  setFieldValue(element.name, val, true)
                  onChange(val, element.name)
                }}
                readonly={false}
                setTouched={setTouched}
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
                uploadFile={uploadFile}
                validate={composeValidate(
                  element.validate,
                  element.validateValue,
                )}
              />
            )}
            <SubNote
              dangerouslySetInnerHTML={createMarkup(element.description)}
            />
          </Section>
        ) : (
          <ElementComponentArray
            elementsComponentArray={element}
            onChange={onChange}
            setFieldValue={setFieldValue}
            setTouched={setTouched}
          />
        ),
      )}

      {filterFileManuscript(manuscript.files).length > 0 ? (
        <Section id="files.manuscript">
          <Legend space>Submitted Manuscript</Legend>
          <Attachment
            file={filesToAttachment(filterFileManuscript(manuscript.files)[0])}
            key={filterFileManuscript(manuscript.files)[0].url}
            uploaded
          />
        </Section>
      ) : null}

      {!manuscript.status === 'submitted' && form.haspopup === 'false' && (
        <Button primary type="submit">
          Submit your manuscript
        </Button>
      )}

      {!manuscript.status !== 'submitted' && form.haspopup === 'true' && (
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
