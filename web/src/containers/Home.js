import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRoutes, allRoutes } from 'reducers/routes';
import Sidebar from 'components/Sidebar';
import List from 'components/List';
import Route from 'components/Route';

const mapStateToProps = state => ({
  routes: allRoutes(state),
});

const mapDispatchToProps = {
  fetchRoutes,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  componentWillMount() {
    this.props.fetchRoutes();
  }
  render() {
    return (
      <Sidebar>
        <List>
          {this.props.routes.map(route =>
            <Route key={route.route_id} data={route} />
          )}
        </List>
      </Sidebar>
    );
  }
}
