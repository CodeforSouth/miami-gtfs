import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MapboxGl from 'mapbox-gl';
import { push } from 'react-router-redux';
import _ from 'lodash';

import styles from './styles.css';
import * as MapState from 'reducers/map';
import * as Routes from 'reducers/routes';

MapboxGl.accessToken =
  'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';

class MapView extends Component {
  static style = 'mapbox://styles/mapbox/streets-v10';
  static center = [-80.2144, 25.772265];

  componentDidMount() {
    this._map = new MapboxGl.Map({
      container: this._mapRef,
      style: MapView.style,
      center: MapView.center,
      zoom: this.props.zoom
    });

    this._map.on('load', this._onLoad);
  }

  componentDidUpdate(previous) {
    setTimeout(this._configureLayers, 0, previous);
  }

  _configureLayers = previous => {
    // if (previous.circleSize !== this.props.circleSize) {
    //   // this._updateStops();
    // }
    if (
      previous.loaded &&
      this.props.loaded &&
      previous.layers === this.props.layers
    )
      return;

    const newLayerIds = this.props.layers
      .map(layer => layer.layer.id)
      .filter((id, i) => i % 2 !== 0);
    const removedLayers = previous.layers.filter((layer, i) => {
      if (i % 2 === 0) return false;
      return newLayerIds.indexOf(layer.layer.id) === -1;
    });

    removedLayers.forEach(layer => {
      this._map.off('click', layer.sourceId, this._onClick);
      this._map.off('mousemove', layer.sourceId, this._onMouseMove);
      this._map.off('mouseleave', layer.sourceId, this._onMouseLeave);
    });

    this.props.layers.forEach((layer, i) => {
      const sourceName = layer.layer.source;
      const source = this._map.getSource(sourceName);
      if (source && layer.data) {
        source.setData(layer.data);
        return;
      }
      this._map.addSource(sourceName, {
        type: 'geojson',
        data: layer.data
      });
      const sourceId = layer.layer.id;
      this._map.addLayer(layer.layer, 'road-oneway-arrows-white');
      if (i % 2 === 0) return;
      this._map.on('mousemove', sourceId, this._onMouseMove);
      this._map.on('mouseleave', sourceId, this._onMouseLeave);
      this._map.on('click', sourceId, this._onClick);
    });
  };

  _updateStops = () => {
    const stopCircles = this._map.getLayer('stopCircles');
    if (!stopCircles) return;
    _(this.props.circleSize).forEach((val, key) => {
      this._map.setPaintProperty('stopCircles', key, val);
    });
  };

  _onMouseMove = e => {
    this._map.getCanvas().style.cursor = 'pointer';
    const marker = e.features[0];
    if (!marker) return;
  };

  _onMouseLeave = e => {
    this._map.getCanvas().style.cursor = '';
  };

  _onClick = e => {
    const marker = e.features[0];
    console.log({ marker });
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

const mapStateToProps = state => ({
  loaded: state.map.loaded,
  zoom: state.map.zoom,
  symbolVisibility: MapState.symbolVisibility(state),
  circleSize: MapState.circleSize(state),
  layers: Routes.layers(state)
});

const mapDispatchToProps = {
  setZoom: MapState.actions.zoom,
  setLoaded: MapState.actions.loaded,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);

// const symbolPaint = {
//   'text-color': '#000',
//   'text-halo-width': 1,
//   'text-halo-color': '#fff'
// };

// const symbolLayout = {
//   'text-field': '{stop_name}',
//   'text-size': 10,
//   'text-offset': [1, 0],
//   'text-anchor': 'left',
//   'text-justify': 'left'
// };

// const circlePaint = {
//   'circle-color': '#157AFC',
//   'circle-stroke-color': '#fff'
// };

// const circleLayout = { visibility: 'visible' };
