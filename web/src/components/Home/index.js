import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Routes from 'reducers/routes';
import List from 'components/List';
import Route from './Route';

class Home extends Component {
  render() {
    return (
      <List>
        {this.props.routes.map(data => <Route data={data} key={data.id} />)}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  routes: Routes.allRoutes(state)
});

export default connect(mapStateToProps)(Home);
