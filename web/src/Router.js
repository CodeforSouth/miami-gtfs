import React, { Component } from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import { history } from 'models/History';

import Chrome from 'components/Chrome';
import Home from 'components/Home';
// import Stops from 'components/Stops';
// import Stop from 'components/Stop';

class Router extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Chrome>
          <Route exact path="/" component={Home} />
          {/*          <Route path="/route/:id" component={Stops} />
          <Route path="/stop/:id" component={Stop} />*/}
        </Chrome>
      </ConnectedRouter>
    );
  }
}

export default Router;
