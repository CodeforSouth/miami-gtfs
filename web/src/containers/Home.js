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

  componentDidUpdate(previous) {
    if (previous.routes !== this.props.routes) {
      this._list.setScrollTop(0);
    }
  }

  _setListRef = ref => {
    this._list = ref;
  };
  render() {
    return (
      <Sidebar>
        <Search />
        <List ref={this._setListRef}>
          {this.props.routes.map(route =>
            <Route key={route.route_id} data={route} />
          )}
        </List>
      </Sidebar>
    );
  }
}
