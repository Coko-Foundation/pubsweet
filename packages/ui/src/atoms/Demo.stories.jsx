// import React from "react";
// import styled from "styled-components";

// const Content = styled.div`
//   width: 200px;
//   line-height: 200px;
//   text-align: center;
//   background-color: ${(props) => props.theme.backgroundColor};
//   color: ${(props) => props.theme.textColor};
//   border: 1px solid dimgrey;
//   border-radius: ${(props) => props.theme.borderRadius};
// `;

// // export default { component: Content, title: 'Test' };

// export const Demo = () => (
//   <Content>Demo</Content>
// );

// import {storiesOf} from "@storybook/react";
// // import * as React from "react";
// import Button from "./Button";

// storiesOf("Examples", module).add("Demo", () => <Button >Save</Button>);

// export default {
//   component: Button,
//   title: 'Demo'
// }

import React from 'react'
// import { action } from '@storybook/addon-actions'
import Button from './Button'

export default {
  component: Button,
  title: 'Button',
}

export const text = () => <Button primary>Hello Button</Button>

export const emoji = () => (
  <Button>
    <span aria-label="so cool" role="img">
      😀 😎 👍 💯
    </span>
  </Button>
)
