import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
// app state
import store from 'store';
// browser history
import { history } from 'lib/history';
// containers
import Chrome from 'containers/Chrome';
import Home from 'containers/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Chrome>
            <Route exact path="/" component={Home} />
          </Chrome>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
