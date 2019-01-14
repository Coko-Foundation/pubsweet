import React from 'react'

import styled from 'styled-components'
// import { Action } from '@pubsweet/ui'
import { Columns, Admin } from './atoms/Columns'
import ComponentProperties from './ComponentProperties'
import FormBuilder from './FormBuilder'

// const DeleteIcon = styled(Action)`
//   margin-left: 10px;
//   line-height: 1.15;
// `

const AdminStyled = styled(Admin)`
  border-left: 1px solid black;
  padding-left: 40px;
`

const FormBuilderLayout = ({
  getForms,
  properties,
  deleteForm,
  deleteElement,
  updateForm,
  createForm,
  updateElements,
  changeProperties,
  changeTabs,
  activeTab,
}) => (
  <Columns>
    <FormBuilder
      changeProperties={changeProperties}
      deleteElement={deleteElement}
      form={getForms[0]}
      key="form-builder-submit"
    />
    <AdminStyled>
      <ComponentProperties onSubmitFn={updateElements} />
    </AdminStyled>
  </Columns>
)

export default FormBuilderLayout
