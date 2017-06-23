import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw',
});

const mapStateToProps = state => ({
  stopsJSON: state.home.stopsJSON,
});

const symbolLayout = {
  'text-field': '{stop_name}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-size': 9,
  'text-offset': [0, -0.5],
  'text-anchor': 'bottom',
};
const symbolPaint = {
  'text-color': '#000',
  'text-halo-width': 1,
  'text-halo-color': '#fff',
};

const circleLayout = { visibility: 'visible' };
const circlePaint = {
  'circle-color': '#157AFC',
  'circle-radius': 2,
  'circle-stroke-width': 1,
  'circle-stroke-color': '#fff',
};

@connect(mapStateToProps)
export default class MapView extends Component {
  static mapStyle = 'mapbox://styles/mapbox/streets-v10';
  static mapCenter = [-80.298386, 25.794859];
  static containerStyle = {
    height: '100%',
    width: '100%',
  };

  _init = (map, e) => {};

  _renderStops = () => {
    const stopsJSON = this.props.stopsJSON;
    if (!stopsJSON) return null;
    return (
      <GeoJSONLayer
        data={stopsJSON}
        circleLayout={circleLayout}
        circlePaint={circlePaint}
        symbolLayout={symbolLayout}
        symbolPaint={symbolPaint}
        before="road-oneway-arrows-white"
      />
    );
  };

  render() {
    return (
      <div className={styles.map}>
        <Map
          style={MapView.mapStyle}
          containerStyle={MapView.containerStyle}
          center={MapView.mapCenter}
          onStyleLoad={this._init}
        >
          {this._renderStops()}
        </Map>
      </div>
    );
  }
}
