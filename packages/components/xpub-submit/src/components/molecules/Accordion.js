import React from 'react'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'
import { withJournal } from 'xpub-journal'
import { Button } from '@pubsweet/ui'

const Root = styled.div``

const ReviewBody = styled.div`
  margin-left: 1em;
`

const ToggleReview = ({ open, toggle }) => (
  <Button onClick={toggle} plain>
    {open ? 'Hide' : 'Show'}
  </Button>
)

const Bullet = ({ journal, recommendation }) => {
  const recommendationColor = () =>
    recommendation
      ? journal.recommendations.find(item => item.value === recommendation)
          .color
      : 'black'

  const Dot = styled.span`
    border-radius: 100%;
    display: inline-block;
    height: 10px;
    margin-right: 10px;
    width: 10px;
    background-color: ${recommendationColor};
  `

  return <Dot />
}

const ReviewHeading = ({
  journal,
  name,
  open,
  ordinal,
  recommendation,
  toggleOpen,
  component,
}) => {
  const Root = styled.div`
    display: flex;
    align-items: baseline;
    border-bottom: 1px solid #000;
    margin-bottom: 20px;
  `
  const Ordinal = styled.span``
  const Name = styled.span``
  const Controls = styled.span`
    flex-grow: 1;
    text-align: right;
  `

  return (
    <Root>
      <Bullet journal={journal} recommendation={recommendation} />
      <Ordinal>Review {ordinal}</Ordinal>
      &nbsp;
      <Name>{name || 'Anonymous'}</Name>
      <Controls>
        <ToggleReview open={open} toggle={toggleOpen} />
      </Controls>
      {component}
    </Root>
  )
}

const Accordion = ({ journal, open, toggleOpen, title, Component }) => (
  <Root>
    <ReviewHeading
      journal={journal}
      name={title}
      open={open}
      ordinal="2"
      // recommendation={recommendation}
      toggleOpen={toggleOpen}
    />
    {open && <ReviewBody>{Component}</ReviewBody>}
  </Root>
)

export default compose(
  withJournal,
  withState('open', 'setOpen', ({ open }) => open || true),
  withHandlers({
    toggleOpen: props => () => {
      props.setOpen(open => !open)
    },
  }),
)(Accordion)
