import React from 'react'
import styled from 'styled-components'

import Action from './Action'
import ActionGroup from './ActionGroup'

import th from '../helpers/themeHelper'

const Title = styled.h3`
  font-family: ${th('fontReading')};
`

const noop = () => {}

const Actions = [
  <Action to="/manuscript">Go to Manuscript</Action>,
  <Action to="/submit">Go to Submission</Action>,
  <Action onClick={noop}>Delete</Action>,
]

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Author = styled.span`
  font-family: ${th('fontInterface')};
  padding-right: 15px;
`

const AuthorList = styled.div`
  display: flex;
`

const Manuscript = ({ authors, title }) => (
  <div>
    <MainContainer>
      <Title>{title}</Title>
      <ActionGroup>{Actions}</ActionGroup>
    </MainContainer>
    <AuthorList>{authors.map(author => <Author>{author}</Author>)}</AuthorList>
  </div>
)

export default Manuscript
