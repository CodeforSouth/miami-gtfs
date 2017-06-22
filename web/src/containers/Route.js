import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrips } from 'reducers/trips';
import Sidebar from 'components/Sidebar';
import List from 'components/List';

const mapDispatchToProps = {
  fetchTrips,
};

@connect(null, mapDispatchToProps)
export default class Route extends Component {
  componentWillMount() {
    this.props.fetchTrips(this.props.match.params.routeId);
  }
  render() {
    return (
      <Sidebar>
        Route
      </Sidebar>
    );
  }
}
