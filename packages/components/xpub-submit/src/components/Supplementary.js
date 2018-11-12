import React from 'react'
import { cloneDeep } from 'lodash'
import { FieldArray } from 'formik'
import { Flexbox, UploadButton, UploadingFile } from '@pubsweet/ui'

const renderFilesUpload = (onChange, uploadFile, createFile) => ({
  form,
  push,
}) => [
  <UploadButton
    buttonText="↑ Upload files"
    onChange={event => {
      Array.from(event.target.files).forEach(file => {
        const fileUpload = {
          fileType: 'supplementary',
          filename: file.name,
        }
        push(fileUpload)
        uploadFile(file).then(({ data }) => {
          const newFile = {
            url: data.upload.url,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
          }
          createFile(newFile)
        })
      })
    }}
  />,
  <Flexbox>
    {cloneDeep(form.values.files || [])
      .filter(val => val.fileType === 'supplementary')
      .map(val => {
        val.name = val.filename
        return <UploadingFile file={val} key={val.name} uploaded />
      })}
  </Flexbox>,
]

const Supplementary = ({ onChange, uploadFile, createFile }) => (
  <FieldArray
    name="files"
    render={renderFilesUpload(onChange, uploadFile, createFile)}
  />
)

export default Supplementary
