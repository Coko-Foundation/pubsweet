import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose, withHandlers, setDisplayName } from 'recompose'

const Separator = styled.div`
  background-color: #000;
  flex: 1;
  height: 2px;
`

const StyledStep = styled.div`
  align-items: center;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  height: 16px;
  justify-content: center;
  position: relative;
  width: 16px;
`

const bulletStyle = css`
  background-color: #000;
  border-radius: 50%;
  height: 10px;
  width: 10px;
`

const Bullet = styled.div`
  ${bulletStyle};
`

const Success = styled.div`
  ${bulletStyle};
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 12px;
  height: 18px;
  justify-content: center;
  width: 18px;
`

const StepTitle = styled.span`
  font-size: 0.9em;
  left: -45px;
  position: absolute;
  text-align: center;
  top: 25px;
  white-space: normal;
  width: 120px;
`

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ margin }) => margin || '20px'};
  min-width: 500px;
`

const Step = ({ title, index, currentStep }) => (
  <StyledStep>
    {index === currentStep && <Bullet />}
    {index < currentStep && <Success>✓</Success>}
    <StepTitle>{`${index + 1}. ${title}`}</StepTitle>
  </StyledStep>
)

const Steps = ({ renderSteps, margin }) => (
  <Root margin={margin}>{renderSteps()}</Root>
)

const DecoratedSteps = compose(
  setDisplayName('Steps'),
  withHandlers({
    renderSteps: ({ children, renderSeparator, currentStep }) => () => {
      const separator = renderSeparator || Separator
      return React.Children.toArray(children).reduce(
        (acc, el, index, arr) =>
          index === arr.length - 1
            ? [...acc, React.cloneElement(el, { index, currentStep })]
            : [
                ...acc,
                React.cloneElement(el, { index, currentStep }),
                React.createElement(separator, { key: `sep-${el.key}` }),
              ],
        [],
      )
    },
  }),
)(Steps)

DecoratedSteps.Step = Step
DecoratedSteps.Separator = Separator

DecoratedSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
  renderSeparator: PropTypes.func,
  margin: PropTypes.string,
}

export default DecoratedSteps
