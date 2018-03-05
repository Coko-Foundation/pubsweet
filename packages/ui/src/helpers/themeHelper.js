/*

A bit of syntactic sugar for styled-components. Lets you replace this:

  ${props => props.theme.colorPrimary}

with this:

  ${th('colorPrimary')}

*/

export default name => props => props.theme[name]
