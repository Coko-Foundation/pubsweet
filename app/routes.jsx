import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import About from 'components/About';
import Dashboard from 'components/Dashboard';
import Manage from 'components/Manage';

import ManageStore from 'stores/ManageStore';

export default (
  <Route component={App}>
    <Route path="/" component={Manage} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="about" component={About} />
  </Route>
);
