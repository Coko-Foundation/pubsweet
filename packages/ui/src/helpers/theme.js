/*

A bit of syntactic sugar for styled-components. Lets you replace this:

  ${props => props.theme.colorPrimary}

with this:

  ${theme.colorPrimary}

*/

export default new Proxy(
  {},
  {
    get(target, name, receiver) {
      return props => props.theme[name]
    },
  },
)
