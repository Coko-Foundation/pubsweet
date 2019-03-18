The component library is a resource that makes PubSweet better for everyone. The more components in the library, and the more people helping maintain them, the better the PubSweet ecosystem becomes for all of us.

When thinking of adding a component, be sure you check beforehand in the PubSweet component library for existing ones. As the library is constantly growing, it might be that a similar component has already been submitted.

Usually components are developed with reusabilty in mind, but they also follow YAGNI ("[You aren't gonna need it](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it 'undefined')") and KISS ("[Keep it simple, stupid](https://en.wikipedia.org/wiki/KISS_principle 'undefined')") principles. It's up to the contributor to decide if a component can be reused, extended, or a new one could be created.

If you develop components, please add them to the library. If you use components developed by others, please consider helping maintain them by reporting issues and contributing bug fixes.

The process for contributing a component, or any other code, is described in the [Contributing to PubSweet](inline 'undefined') chapter. The technical requirements and suggestions for components are outlined below:

# Development

The easiest way to start with a new component is to take an existing component from the component library, the closest one to what you need, and use it as a starting point.

A PubSweet component, whether a server or client component, is an `npm` package and should respect the following file structure:

- `index.js` (conventional structure to register the component);
- `package.json` (used for npm, declaring component dependencies);
- `README.md` (documentation for installation, usage, customization etc.);
- `CHANGELOG.md` (register version, changes, breaking-changes etc.);
- Component files or folders.

Things to keep in mind when creating a new component:

- Start with reusability in mind;
- Follow the principles of DRY ("[Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself 'undefined')"), KISS, YAGNI;
- Use variables, theme variables for styling, React props, etc., instead of hardcoded values;
- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/ 'undefined') or keep a healthy changelog;
- Write documentation;
- Write tests.

# Design

## Layout and what makes a UI component

Relying on Brad Frost's principles of Atomic Design, PubSweet UI (`@pubsweet/ui`) is a single component offering an ensemble of smaller reusable elements classified as either atoms or molecules. We use the word "component" to refer both to a component released as an independent package and to any of the elements inside PubSweet UI.

## Atoms and Molecules

The goal of PubSweet UI naming is to bring the same vocabulary across the applications and members of the community.

- An atom is the smallest bit of UI that you can reuse in your application (a button, an input, etc.) You could call an atom any element that it wouldn't make sense to divide into multiple parts: a radio button with a label, for instance.
- A molecule is a reusable component made of multiple atoms. A login form, for instance, is made of two atoms of input (username and password) and an atom of a button (login).

You can use any of the atoms and molecules when creating a component. To be able to choose the atoms and molecules you need, you can have a look at the [PubSweet styleguide](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/styleguide 'undefined').

To be able to contribute a UI element, you need to be sure that it's usable within the starter-kit default theme without any CSS override.

Because an atom has no way to know how it’s going to be used in different molecules, it should be ready for all options. In particular, it should not define any layout that will determine where it appears on the page.

Let’s take the example of a series of radio buttons. In a group of two ("yes" and "no", for example), the radio buttons should be laid out inline. But if you need to provide more than two options, the brain will have an easier time scanning from top to bottom, so the layout will be different.

### Theming-ready component

As PubSweet provides a set of tools to easily change the look and feel of any UI element, your atom or molecule should be developed using the set of variables as the minimum-required CSS.

For example, the primary button atom is set to use the primary color for its background color:

const Button = styled.button\`
background: \${props => props.theme.colorPrimary};
\`

For a complete list of variables, you can check the `pubsweet/design` repo [regarding variables](https://gitlab.coko.foundation/pubsweet/design/blob/master/OnTheming.md#variables 'undefined').

## Accessibility

Accessibility must be an important consideration in the choices of design and UI/UX made for PubSweet. As a minimum, all PubSweet components must comply with the Web Content Accessibility Guidelines (WCAG) version 2.0 at level AA. There is no simple checklist or automated test for this but here are some things to keep in mind:

- Ensure that all forms and controls can be operated using the keyboard only. This includes having a recognisable style on the currently-focused element.
- Test components and pages in a screen reader such as ChromeVox, VoiceOver (Mac) or Narrator (Windows) and check that the order in which things are announced makes sense.
- Use the Accessible Rich Internet Applications (ARIA) specification to your advantage. It provides a number of attributes that allow custom UI components to be imparted with the same accessibility features as native components such as `<button>` or `<select>`.
- Colors should be chosen with contrast in mind and ratio should pass at least the AA grade for the WCAG 2.0 test.

## Further reading

- [W3C Accessibility homepage](https://www.w3.org/standards/webdesign/accessibility 'undefined')
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/ 'undefined')
- [Authoring Tool Accessibility Guidelines (ATAG)](https://www.w3.org/WAI/standards-guidelines/atag/ 'undefined')
- [The A11Y project](https://a11yproject.com 'undefined')
- [Inclusive Components](https://inclusive-components.design 'undefined')

## Setting the vertical rhythm

A vertical rhythm is a way to bring consistency in spacing, so each UI component fits into place and none seems awkward (unless you design it that way). Therefore each component should use the same vertical grid for its internal layout. Setting the line-height of your body text as a `gridUnit` variable is a good way to keep a coherent relationship between your text and your non-textual elements.

In HTML, the height of an element is always the result of this formula: `border-top` + `padding-top` + `content` + `padding-bottom` + `border-bottom`. Be sure that the result of the calculation is always a multiple of your `gridUnit`.
