import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import { setZoom, symbolLayout, circlePaint } from 'reducers/map';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw',
});

const mapStateToProps = state => ({
  zoom: state.map.zoom,
  stopsJSON: state.home.stopsJSON,
  symbolLayout: symbolLayout(state),
  circlePaint: circlePaint(state),
});

const mapDispatchToProps = {
  setZoom,
};

const symbolPaint = {
  'text-color': '#000',
  'text-halo-width': 1,
  'text-halo-color': '#fff',
};

const circleLayout = { visibility: 'visible' };

@connect(mapStateToProps, mapDispatchToProps)
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
        circlePaint={this.props.circlePaint}
        symbolLayout={this.props.symbolLayout}
        symbolPaint={symbolPaint}
        before="road-oneway-arrows-white"
      />
    );
  };

  _onClick = (map, e) => {
    console.log(e);
  };

  _onZoom = (map, e) => {
    this.props.setZoom([map.getZoom()]);
  };

  render() {
    return (
      <div className={styles.map}>
        <Map
          zoom={this.props.zoom}
          style={MapView.mapStyle}
          containerStyle={MapView.containerStyle}
          center={MapView.mapCenter}
          onStyleLoad={this._init}
          onClick={this._onClick}
          onZoom={this._onZoom}
        >
          {this._renderStops()}
        </Map>
      </div>
    );
  }
}
