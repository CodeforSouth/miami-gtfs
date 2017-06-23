import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterRoutes } from 'reducers/home';
import Search from 'components/Search';

const mapStateToProps = state => ({
  filter: state.home.filter,
});

const mapDispatchToProps = {
  filterRoutes,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RouteSearch extends Component {
  render() {
    return (
      <Search
        onChange={this.props.filterRoutes}
        value={this.props.filter}
        placeholder="Search Routes"
      />
    );
  }
}
