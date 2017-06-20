import React, { Component } from 'react';
import Sidebar from 'components/Sidebar';

export default class Home extends Component {
  componentWillMount() {
    // this.props.fetchRoutes()
  }
  render() {
    return (
      <Sidebar>
        home
      </Sidebar>
    );
  }
}
