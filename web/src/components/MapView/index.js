import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import * as MapboxGl from 'mapbox-gl';
import _ from 'lodash';
import { setZoom, setLoaded, symbolVisibility, circleSize } from 'reducers/map';

MapboxGl.accessToken =
  'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';

const mapStateToProps = state => ({
  loaded: state.map.loaded,
  zoom: state.map.zoom,
  stopsJSON: state.home.stopsJSON,
  symbolVisibility: symbolVisibility(state),
  circleSize: circleSize(state),
});

const mapDispatchToProps = {
  setZoom,
  setLoaded,
};

const symbolPaint = {
  'text-color': '#000',
  'text-halo-width': 1,
  'text-halo-color': '#fff',
};

const symbolLayout = {
  'text-field': '{stop_name}',
  'text-size': 10,
  'text-offset': [1, 0],
  'text-anchor': 'left',
  'text-justify': 'left',
};

const circlePaint = {
  'circle-color': '#157AFC',
  'circle-stroke-color': '#fff',
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

  componentDidMount() {
    this._map = new MapboxGl.Map({
      container: this._mapRef,
      style: MapView.mapStyle,
      center: MapView.mapCenter,
      zoom: this.props.zoom,
    });

    this._map.on('load', this._onLoad);
  }

  componentDidUpdate(previous) {
    const loaded = !previous.loaded && this.props.loaded;
    if (!this.props.loaded) return;
    if (loaded || previous.stopsJSON !== this.props.stopsJSON) {
      this._setStops();
    }
    if (previous.symbolVisibility !== this.props.symbolVisibility) {
      this._updateLabels();
    }
    if (previous.circleSize !== this.props.circleSize) {
      this._updateStops();
    }
  }

  _setStops = () => {
    const stopSource = this._map.getSource('stops');
    if (!this.props.stopsJSON && stopSource) {
      this._map.removeSource('stops');
      this._map.removeLayer('stopCircles');
      this._map.removeLayer('stopLabels');
    } else if (this.props.stopsJSON && stopSource) {
      stopSource.setData(this.props.stopsJSON);
    } else if (this.props.stopsJSON) {
      this._map.addSource('stops', {
        type: 'geojson',
        data: this.props.stopsJSON,
      });
      this._map.addLayer(
        {
          id: 'stopCircles',
          type: 'circle',
          source: 'stops',
          paint: {
            ...circlePaint,
            ...this.props.circleSize,
          },
          layout: circleLayout,
        },
        'road-oneway-arrows-white'
      );
      this._map.addLayer(
        {
          id: 'stopLabels',
          type: 'symbol',
          source: 'stops',
          paint: symbolPaint,
          layout: {
            ...symbolLayout,
            ...this.props.symbolVisibility,
          },
        },
        'road-oneway-arrows-white'
      );
      this._map.on('mouseenter', 'stopCircles', () => {
        this._map.getCanvas().style.cursor = 'pointer';
      });
      this._map.on('mouseleave', 'stopCircles', () => {
        this._map.getCanvas().style.cursor = '';
      });
    }
  };

  _updateLabels = () => {
    const stopLabels = this._map.getLayer('stopLabels');
    if (!stopLabels) return;
    _(this.props.symbolVisibility).forEach((val, key) => {
      this._map.setLayoutProperty('stopLabels', key, val);
    });
  };

  _updateStops = () => {
    const stopCircles = this._map.getLayer('stopCircles');
    if (!stopCircles) return;
    _(this.props.circleSize).forEach((val, key) => {
      this._map.setPaintProperty('stopCircles', key, val);
    });
  };

  _onLoad = () => {
    this.props.setLoaded();
    this._map.on('zoom', this._onZoom);
  };

  _onZoom = (map, e) => {
    this.props.setZoom([this._map.getZoom()]);
  };

  _setMapRef = ref => {
    this._mapRef = ref;
  };

  render() {
    return <div className={styles.map} ref={this._setMapRef} />;
  }
}
