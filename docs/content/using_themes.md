# Overview

It's desirable to have a coherent, consistent user experience throughout a platform. Buttons should all behave the same way, links should all have the same look, tooltips should all use the same font, and so on. Such consistency improves the user experience by providing familiarity and reassurance. PubSweet achieves this consistency using a theming mechanism built on top of React and Styled Components. This mechanism provides a number of options which can be mixed and matched.

The simplest option is to use one of the existing PubSweet themes such as the default Coko theme.

The second and most commonly used option is to customise the theme variables of an existing theme. Choose one you like the look of, then edit the colors and fonts to more closely fit your brand.

If you wish to change a style not accounted for by the theme variables, many components provide extension hooks. These allow the theme to specify arbitrary CSS to be applied to components. With this approach, care must be taken to ensure the new style does not adversely affect the usability and accessibility of the affected components.

Despite these extension points, sometimes the theme is not enough and the component itself must be modified. In this case, instead of forking (copying and editing) the component, we recommend that you reach out to the community to see whether your proposed modification could instead be integrated into PubSweet.

<img src="image-28-0.jpg" style="width: 100%;max-width: 400px; display: block;margin: 1em auto;">

Hindawi and eLife collaborating on component styling

As a last resort, you always have the choice of creating your own custom components. See [Creating a component](#/Components?id=section-how-do-you-create-a-component 'undefined') for more information, and the chapter on [Contributing to PubSweet](#/Contributing 'undefined') to learn how and when to feed such efforts back to the community.

# Using themes

To get started with the default PubSweet theme, you need to pass it as a prop to the `Root` React component from`pubsweet-client`, generally in your `app.js` file. This will make it available to all the Styled Components in the app as `props.theme`. See [Getting Started with PubSweet](#/Getting%20started 'undefined') for an example `app.js` file.

## About theme variables

In its most basic form a PubSweet theme is a list of variables and their corresponding values. UI components can use these variables to adapt their look and feel to the current theme.

For example, take a look at the component below.

```js static
const Button = styled.button`
  background: ${props => props.theme.colorPrimary};
`
```

Refer to the [Styled Components documentation](https://www.styled-components.com/docs 'undefined') if this looks new to you.

This component expects a `colorPrimary` variable to have been declared in the theme, and it will apply that variable's value to its background. Other components can also apply the same color for their properties, giving your application a consistent look and feel that can be modified with minimal effort.

Use of variables in components is encouraged, as it enhances their reusability. This way you can use different themes to deliver a distinct experience when using the same components.

A more realistic version of a button component would look more like the code below.

```js static
const Button = styled.button`
  background: ${th('colorSecondary')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-radius: ${th('borderRadius')};
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('gridUnit')};
  min-width: calc(${th('gridUnit')} \* 4);
  padding: calc(${th('gridUnit')} / 2);
`
```

Since accessing theme variables is such a common case, a helper function `th` is provided. `th('name')` is equivalent to `props => props.theme.name`.

It's generally advisable to give the list of variables that you use some thought in advance, or you'll quickly find yourself in variable mayhem. A bad example of a variable name would be `varForItalicWordInTitlesWhenFirstOnPage`. This is unlikely to be reused in the application, as it’s too specific.

Variables are named according to a convention using camel case and two or optionally three parts where the parts are as follows: `categoryElement` or `categoryElementModifier`.

## Core theme variables

### Colors

- `colorBackground`: The background in your pages (eg. on the `body` HTML tag)
- `colorBackgroundHue`: Used to create a discrete contrast with the default background color
- `colorPrimary`: Indicates a primary call to action
- `colorSecondary`: Default color for non-primary actions
- `colorBorder`: For borders around elements
- `colorFurniture`: Meant to be applied to elements that indicate content division
- `colorError`: Used to indicate an error in validation
- `colorSuccess`: Used to indicate a successful validation state
- `colorWarning`: Used to indicate a validation warning
- `colorText`: Default font color
- `colorTextReverse`: Reverse font color
- `colorTextPlaceholder`: Used for text field placeholders

### Typography

- `fontInterface`: Used for elements by default
- `fontReading`: Main reading text
- `fontWriting`: Font used for writing (eg. inside an editor)
- `fontSizeBase`: Default font size
- `fontSizeBaseSmall`: Smaller variation of the default font size
- `fontSizeHeading1`: Size for Heading 1
- `fontSizeHeading2`: Size for Heading 2
- `fontSizeHeading3`: Size for Heading 3
- `fontSizeHeading4`: Size for Heading 4
- `fontSizeHeading5`: Size for Heading 5
- `fontSizeHeading6`: Size for Heading 6
- `lineHeightBase`: Default line height
- `lineHeightBaseSmall`: Small line height

### Spacing

- `gridUnit`: Base interface space measurement used by elements and typography

### Border

- `borderRadius`: Radius value applied to borders
- `borderWidth`: Width value applied to borders
- `borderStyle`: Style applied to borders (eg. solid, dashed)

### Shadow

- `dropShadow`: Default shadow that is applied to elements that float (eg. tooltips, modals)

### Transition

- `transitionDuration`: How long transitions should last
- `transitionTimingFunction`: Which function should be applied to transitions (eg. `easein`)
- `transitionDelay`: How long transitions should be delayed before they begin

In order to make it easy to get started, we also provide the **default theme** with PubSweet. The default theme has all the variables that have been listed above, with values that we consider a good general starting point. This theme has intentionally steered away from bold stylistic choices and is intended to be as vanilla as possible.

If you find the default theme doesn't meet your needs, it can still serve as a great starting point to create your own theme. Simply copy the list of variables into your own theme, then change the variable values until they suit your taste.

Existing PubSweet components, and those contributed by the community, must use this core set of variables. This ensures that any component can be used out-of-the-box with any theme. You may choose to define further variables in your theme and use these in your own components, but be aware that this will make it harder to contribute your components back to the community. It is recommended, but not required, that you include your style-related assets (e.g. fonts) in your theme, especially if you plan to publish it as an npm package.

It may be that the set of core theme variables grows with time as new interface elements emerge which need to be standardised across the UI. If you have a use case for such an addition, we encourage you to discuss it with the community.
