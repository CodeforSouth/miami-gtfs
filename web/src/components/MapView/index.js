import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MapboxGl from 'mapbox-gl';
import { push } from 'react-router-redux';

import styles from './styles.css';
import * as MapState from 'reducers/map';
import * as Routes from 'reducers/routes';
import * as Popup from 'reducers/popup';
// import { colors } from 'contants.js';

MapboxGl.accessToken =
  'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';

class MapView extends Component {
  static style = 'mapbox://styles/mapbox/streets-v10';
  static center = [-80.2144, 25.772265];
  static zoom = [12];

  componentDidMount() {
    this._map = new MapboxGl.Map({
      container: this._mapRef,
      style: MapView.style,
      center: MapView.center,
      zoom: MapView.zoom
    });

    this._map.on('load', this._onLoad);
  }

  componentDidUpdate(previous) {
    setTimeout(this._configureLayers, 0, previous);
  }

  _configureLayers = previous => {
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
      this._map.addLayer(layer.layer /*, 'road-oneway-arrows-white' */);

      if (i % 2 === 0) return;

      this._map.on('mousemove', sourceId, this._onMouseMove);
      this._map.on('mouseleave', sourceId, this._onMouseLeave);
      this._map.on('click', sourceId, this._onClick);

      this._map.addLayer(layer.labels /*, 'road-oneway-arrows-white' */);
    });
  };

  _onMouseMove = e => {
    this._map.getCanvas().style.cursor = 'pointer';
    const marker = e.features[0];
    if (!marker) return;
    const lngLat = JSON.parse(marker.properties.lngLat);
    const position = this._map.project(lngLat);
    const payload = {
      id: marker.properties.stop,
      position
    };
    this.props.hover(payload);
  };

  _onMouseLeave = e => {
    this._map.getCanvas().style.cursor = '';
    this.props.leave();
  };

  _onClick = e => {
    const marker = e.features[0];
    if (!marker) return;
    const lngLat = JSON.parse(marker.properties.lngLat);
    const position = this._map.project(lngLat);
    const payload = {
      id: marker.properties.stop,
      position
    };
    this.props.select(payload);
  };

  _onLoad = () => {
    this.props.setLoaded();

    this._userLocation();

    this._trolleys();
  };

  _trolleys = () => {
    function positionGEOJSON(entity) {
      return {
        type: 'Point',
        coordinates: [
          entity.vehicle.position.longitude,
          entity.vehicle.position.latitude
        ]
      };
    }

    this._interval = setInterval(async () => {
      const res = await fetch('https://d0c45bdf.ngrok.io/api/protobuf').then(
        res => res.json()
      );

      res.entity.forEach(entity => {
        const source = this._map.getSource(entity.id);
        if (source) {
          source.setData(positionGEOJSON(entity));
          return;
        }

        this._map.addSource(entity.id, {
          type: 'geojson',
          data: {
            type: 'Point',
            coordinates: positionGEOJSON(entity)
          }
        });

        this._map.addLayer({
          id: entity.id,
          source: entity.id,
          type: 'circle',
          paint: {
            'circle-color': '#e0e0e0',
            'circle-stroke-color': '#979797',
            'circle-radius': 8,
            'circle-stroke-width': 1
          }
        });
      });
    }, 2000);
  };

  _userLocation = () => {
    function positionGEOJSON(position) {
      return {
        type: 'Point',
        coordinates: [position.coords.longitude, position.coords.latitude]
      };
    }

    navigator.geolocation.getCurrentPosition(position => {
      this._map.addSource('user', {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: positionGEOJSON(position)
        }
      });

      this._map.addLayer({
        id: 'user',
        source: 'user',
        type: 'circle',
        paint: {
          'circle-color': '#157afc',
          'circle-stroke-color': '#fff',
          'circle-radius': 3,
          'circle-stroke-width': 1
        }
      });

      const watchID = navigator.geolocation.watchPosition(position => {
        this._map.getSource('user').setData(positionGEOJSON(position));
      });
    });
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
  layers: Routes.layers(state)
});

const mapDispatchToProps = {
  setLoaded: MapState.actions.loaded,
  push,
  select: Popup.actions.select,
  clear: Popup.actions.clear,
  hover: Popup.actions.hover,
  leave: Popup.actions.leave
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
