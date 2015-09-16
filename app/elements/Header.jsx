import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server'

import config from 'helmconfig.js';

class Header extends React.Component {
  render() {
    return (
      <Helmet
        title="PubSweet"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

renderToString(<Header />);
let header = Helmet.rewind();

export default header;
