import React from 'react'
import styled from 'styled-components'
import { Button, Menu } from '@pubsweet/ui'
import { TeamTableCell } from './molecules/Table'

const StyledMenu = styled(Menu)`
  width: 100%;
`

const FormBuilder = () => [
  <TeamTableCell width={5}>1</TeamTableCell>,
  <TeamTableCell>tefsd</TeamTableCell>,
  <TeamTableCell>4444</TeamTableCell>,
  <TeamTableCell width={40}>
    <StyledMenu inline multi name="members" options={[]} />
  </TeamTableCell>,
  <TeamTableCell width={15}>
    <Button>Delete</Button>
  </TeamTableCell>,
]

export default FormBuilder
