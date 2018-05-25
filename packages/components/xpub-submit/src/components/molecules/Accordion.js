import React from 'react'
import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'
import { withJournal } from 'xpub-journal'
import { Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const Root = styled.div``

const AccordionBody = styled.div``
const Title = styled.span`
  font-size: ${th('fontSizeHeading5')};
  font-family: ${th('fontHeading')};
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

const AccordionHeading = ({
  journal,
  name,
  open,
  ordinal,
  recommendation,
  toggleOpen,
  component,
  withDots,
}) => {
  const Root = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: ${th('gridUnit')};
  `

  const Ordinal = styled(Title)``
  const Controls = styled.span``

  const Head = styled.div`
    ${() => !withDots && 'border-bottom: 1px solid #000;'};
    align-items: baseline;
    display: flex;
    flex: 1;
    justify-content: space-between;
  `

  const Dots = styled.span`
    background-image: linear-gradient(to right, #666 50%, white 0%);
    background-position: 0 90%;
    background-repeat: repeat-x;
    background-size: 6px 1px;
    position: relative;
    height: 1px;
    flex: 1;
    margin-left: 10px;
  `

  return (
    <Root>
      {recommendation && (
        <Bullet journal={journal} recommendation={recommendation} />
      )}
      <Head>
        <Ordinal>
          {name} {ordinal}
        </Ordinal>
        {withDots && <Dots />}
        <Controls>
          <ToggleReview open={open} toggle={toggleOpen} />
        </Controls>
      </Head>
      {component}
    </Root>
  )
}

const Accordion = ({
  journal,
  open,
  ordinal,
  toggleOpen,
  title,
  status,
  Component,
  withDots,
}) => (
  <Root>
    <AccordionHeading
      journal={journal}
      name={title}
      open={open}
      ordinal={ordinal}
      recommendation={status}
      toggleOpen={toggleOpen}
      withDots={withDots || false}
    />
    {open && <AccordionBody>{Component}</AccordionBody>}
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
