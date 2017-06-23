import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch, routesArray } from 'reducers/home';
import Sidebar from 'components/Sidebar';
import List from 'components/List';
import Route from 'components/Home/Route';
import Search from 'components/Home/Search';

const mapStateToProps = state => ({
  routes: routesArray(state),
});

const mapDispatchToProps = {
  fetch,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  componentWillMount() {
    this.props.fetch();
  }
  render() {
    return (
      <Sidebar>
        <Search />
        <List>
          {this.props.routes.map(route =>
            <Route key={route.route_id} data={route} />
          )}
        </List>
      </Sidebar>
    );
  }
}
