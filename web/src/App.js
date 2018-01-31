import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'rxjs';

import store from 'models/Store';
import Router from 'Router';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
