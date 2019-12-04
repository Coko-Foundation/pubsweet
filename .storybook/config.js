import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
// import { ThemeProvider } from 'styled-components'

// const defaultTheme = require('@pubsweet/coko-theme')

const defaultTheme = {
  name: 'DEFAULT',
  backgroundColor: 'azure',
  textColor: 'dimgrey',
  borderRadius: '30px',
}

// const darkTheme = {
//   name: "DARK",
//   backgroundColor: "black",
//   textColor: "seashell",
//   borderRadius: "d100px",
// };

const themes = [defaultTheme]

addDecorator(withThemesProvider(themes))

// addDecorator((story) => {
//   console.error(story, 'I AM HERE GOD DAMN IT')
//   return (
//   <ThemeProvider theme={defaultTheme}>
//     {'the fuck!'}
//     {story()}
//   </ThemeProvider>
// )})

configure(
  [
    // require.context('../packages/', true, /\.stories\.mdx$/),
    require.context('../packages/', true, /\.stories\.(jsx?|mdx)$/),
    require.context('../components/', true, /\.stories\.(jsx?|mdx)$/),
    require.context('../docs/', true, /\.stories\.(jsx?|mdx)$/),
  ],
  module,
)
