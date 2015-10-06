import Iso from 'iso';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import React from 'react';
import { renderToString } from 'react-dom/server'

import alt from './altInstance';
import routes from './routes.jsx';
import html from './base.html';

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {Object} Data to bootstrap our altStores with
 * @param {Object} req passed from Express/Koa server
 */
const renderToMarkup = (alt, state, req, res) => {
  let markup;
  let location = createLocation(req.originalUrl);
  alt.bootstrap(state);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation)
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    else if (error)
      res.send(500, error.message)
    else if (renderProps == null)
      res.send(404, 'Not found')
    else {
      let content = renderToString(<RoutingContext {...renderProps}/>);
      markup = Iso.render(content, alt.flush());
    }
  });

  return markup;
};

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(state, req, res) {
  const markup = renderToMarkup(alt, state, req, res);
  return html.replace('CONTENT', markup);
};
