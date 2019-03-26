# Beyond variables

We have covered how changing a variable can affect the look and feel of components that use that variable. But what about scenarios where there is no variable to effect the necessary change?

Let's look at the following component:

```js static
const MyComp = styled.div`
  background-color: ${props => props.theme.colorBackground};

  &:hover {
    background-color: none;
  }

  ${props => props.theme.cssOverrides.MyComp};
`
```

The background color uses a theme variable, but the hover color does not as there is no theme variable for it. However, the code on the last line provides an extension point for the theme to override the style of the component.

```js static
const myTheme = {
  colorBackground: 'white';

  cssOverrides: {
    MyComp: css`
      &:hover {
        background-color: 'magenta';
      }
    `
  }
}
```

Now the component will turn its background color to magenta when hovered over. This allows us to apply arbitrary CSS to components by modifying only the theme. This way we can also keep our components clean, letting them provide some sane defaults, but making sure that different style needs are not a blocker for reuse. Note that it's important that the overrides are injected last in the component CSS to ensure that all styles can be overridden.

# Helper functions

There are a small number of functions to help with theming (and UI component development in general). These are available in the `@pubsweet/ui-toolkit` package.

## th

The `th` function simplifies accessing theme values from a styled component. Instead of

```js static
const MyComp = styled.div`
  background-color: ${props => props.theme.colorPrimary};
`
```

you can write

```js static
const MyComp = styled.div`
  background-color: ${th('colorPrimary')};
`
```

## override

In a similar fashion to the `th` function, `override` is meant to simplify the writing of the override lines that come at the end of components' style sections and provide a hook to connect to the theme's overrides section.

This is what an override would look like in a component without the helper function.

```js static
const MyComp = styled.div`
  background-color: ${th('colorPrimary')};

  ${props => props.theme.cssOverrides.MyComp};
  ${props => props.theme.cssOverrides.MyComp.Root};
`
```

There are two lines here to enable writing an override in the theme, either (a) directly with the `css` function that styled-components provides, or (b) as a key in a larger object. In the case of (a) the theme would be defined as follows:

```js static
const MyTheme = {
  colorBackground: 'white',
  colorPrimary: 'blue',

  cssOverrides: {
    MyComp: css`
      background: 'green';
    `,
  },
}
```

In the case of (b), when part of a larger object, the theme is defined:

```js static
const MyTheme = {
  colorBackground: 'white',
  colorPrimary: 'blue',

  cssOverrides: {
    MyComp: {
      Root: css`
        background: 'green';
      `,
    },
  },
}
```

Using the `override` function our component code could be rewritten as follows:

```js static
const MyComp = styled.div`
  background-color: ${th('colorPrimary')};

  ${override('MyComp')};
`
```

Or to get more specific in the object hierarchy:

```js static
const MyComp = styled.div`
  background-color: ${th('colorPrimary')};

  ${override('MyComp.Label')};
`
```

Note that the override function makes the assumption that your theme's overrides exist under the `cssOverrides` key in your theme object.

## darken / lighten

You can use our `darken` and `lighten` functions to adjust colors' lightness.

```js static
const MyComp = styled.div`
  background-color: ${darken('colorPrimary', 0.5)};
`
```

This is particularly useful for avoiding the need to introduce new variables to account for a darker version of a color. For example, if two variations are needed for green in dealing with successful validations, the variables `colorSuccess` and `colorSuccessDark` might be used. Then, if a change to `colorSuccess` is needed, a change to `colorSuccessDark` will also be needed. By using the `darken` and `lighten` functions, a single variable and any associated variations are automatically updated.

These functions are flexible in their input, allowing for hex values, rgb values or percentage points instead of decimal points to be given as arguments. All of the statements below are valid.

```js static
const MyComp = styled.div`
  background-color: ${darken('#AAAAAA', 0.3)};
  background-color: ${lighten('#AAA', 0.7)};
  background-color: ${darken('rgb(255, 255, 255)', 0.2)};
  background-color: ${darken('colorPrimary', 0.3)};
  background-color: ${lighten('someProperty.customColor', 0.5)};
  background-color: ${darken('colorPrimary', 50)};
`
```

## headingScale

The `headingScale` function provides an easy way to conform to a heading scale derived from a base value without the need to look up the scale's values online. The function will receive a base font size, a scale and a heading level (1 to 6) and return the appropriate font size by multiplying the scale by the previous heading's font size.

```js static
const MyTheme = {
  fontSizeHeading4: `${headingScale(12, 1.2, 4)}px`, // evaluates to 17.28
}
```

Note that the scale function returns values as integers so units must be appended (eg. `px`).
