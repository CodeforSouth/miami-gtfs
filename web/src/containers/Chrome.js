import React, { Component } from 'react';
import MapView from 'components/MapView';

export default class Chrome extends Component {
  render() {
    return (
      <div>
        <MapView />
        {this.props.children}
      </div>
    );
  }
}
