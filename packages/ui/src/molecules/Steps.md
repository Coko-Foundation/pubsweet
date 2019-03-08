# Steps

`Steps` is a navigation bar that guides users through the steps of a task. Use it whenever there is a sequence of tasks or steps that need to be done. By default the `Steps` modules has a `Step` and `Separator` default components, but custom components with different styles can be used as shown in the examples below.

## Examples

- Usage with the Step component.

```js
initialState = { currentStep: 0 }
;<div>
  <Steps currentStep={state.currentStep} margin={'40px 50px'}>
    <Steps.Step title="First step" />
    <Steps.Step title="Second step" />
    <Steps.Step title="Third step" />
  </Steps>
  <button
    onClick={() => {
      if (state.currentStep > 0) {
        setState({ currentStep: state.currentStep - 1 })
      }
    }}
  >
    Prev
  </button>
  <button
    onClick={() => {
      if (state.currentStep < 3) {
        setState({ currentStep: state.currentStep + 1 })
      }
    }}
  >
    Next
  </button>
</div>
```

- Usage with a custom step component

```js
const StepComponent = ({ index, currentStep, customProp }) => {
  return (
    <div>
      {customProp} / {index}
    </div>
  )
}

;<Steps currentStep={1}>
  <StepComponent customProp="Hei" />
  <StepComponent customProp="Ho" />
  <StepComponent customProp="Let's go!" />
</Steps>
```

Each child of the Steps component has access to the `currentStep` and also it's own `index`.

- Usage with a custom separator
  When the default separator is not what you want you can always pass a custom separator component. This custom separator will be placed between each two adjacent children.

```js
const StepComponent = ({ index, currentStep, customProp }) => {
  return (
    <div>
      {customProp} / {index}
    </div>
  )
}

const Separator = () => {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: 'salmon',
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      DIVIDER OF WORLDS
    </div>
  )
}

;<Steps currentStep={1} renderSeparator={Separator}>
  <StepComponent customProp="Hei" />
  <StepComponent customProp="Ho" />
  <StepComponent customProp="Let's go!" />
</Steps>
```
