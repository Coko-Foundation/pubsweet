import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { override } from '@pubsweet/ui-toolkit'

const Separator = styled.div`
  background-color: #000;
  flex: 1;
  height: 2px;

  ${override('ui.Steps.Separator')};
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

  ${override('ui.Steps.Step')};
`

const Bullet = styled.div`
  background-color: #000;
  border-radius: 50%;
  height: 10px;
  width: 10px;

  ${override('ui.Steps.Bullet')};
`

const Success = styled(Bullet)`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 12px;
  height: 18px;
  justify-content: center;
  width: 18px;

  ${override('ui.Steps.Success')};
`

const StepTitle = styled.span`
  font-size: 0.9em;
  position: absolute;
  text-align: center;
  top: 25px;
  white-space: normal;
  width: 120px;

  ${override('ui.Steps.StepTitle')};
`

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${({ margin }) => margin};
  min-width: 500px;

  ${override('ui.Steps')};
`

const Step = ({ title, index, currentStep }) => (
  <StyledStep isCurrent={index === currentStep} isPast={index < currentStep}>
    {index === currentStep && <Bullet />}
    {index < currentStep && <Success />}
    {title && (
      <StepTitle isCurrent={index === currentStep} isPast={index < currentStep}>
        {title}
      </StepTitle>
    )}
  </StyledStep>
)

const Steps = ({
  children,
  className,
  renderSeparator = Separator,
  currentStep,
  margin = '20px',
}) => (
  <Root className={className} margin={margin}>
    {React.Children.toArray(children).reduce(
      (acc, el, index, arr) =>
        index === arr.length - 1
          ? [...acc, React.cloneElement(el, { index, currentStep })]
          : [
              ...acc,
              React.cloneElement(el, { index, currentStep }),
              React.createElement(renderSeparator, {
                key: `sep-${el.key}`,
                isCurrent: index === currentStep,
                isPast: index < currentStep,
              }),
            ],
      [],
    )}
  </Root>
)

Steps.Step = Step
Steps.Separator = Separator

Steps.propTypes = {
  /** The current step of the wizard. */
  currentStep: PropTypes.number.isRequired,
  /** Separator component to be rendered between two adjacent children. */
  renderSeparator: PropTypes.func,
  /** Margin of the root container. */
  margin: PropTypes.string,
}

export default Steps
