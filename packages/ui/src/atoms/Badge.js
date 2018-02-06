import React from 'react'
import styled from 'styled-components'

const Root = styled.span`
  align-items: center;
  background: linear-gradient(
    #fff 0,
    #fff 1.1em,
    grey 1.1em,
    grey 1.2em,
    #fff 1.15em,
    #fff 2em
  );
  font-family: var(--font-interface);
  font-size: 1em;
  margin-right: 1em;
  padding-bottom: 1em;
`

const Count = styled.span`
  border-radius: 50%;
  color: grey;
  font-size: 1em;
  font-weight: 600;
  padding-right: 0.5em;
  text-align: center;
`

const Label = styled.span`
  display: inline-block;
  padding: 0;
  text-shadow: 0.05em 0.05em 0 #fff, -0.05em -0.05em 0 #fff,
    -0.05em 0.05em 0 #fff, 0.05em -0.05em 0 #fff;
`

const Badge = ({ count, label, plural }) => (
  <Root>
    <Count>{count}</Count>
    <Label>{plural && count !== 1 ? plural : label}</Label>
  </Root>
)

export default Badge
