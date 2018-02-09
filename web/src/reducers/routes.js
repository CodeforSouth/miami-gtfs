import { combineReducers } from 'redux';
import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { createActions } from 'lib/actions';
import polyline from '@mapbox/polyline';

const mutations = ['fetch', 'set'];

export const { types, actions } = createActions(mutations, 'routes');

function data(state = Immutable.Map(), { type, payload }) {
  switch (type) {
    case types.set:
      if (payload.routes) {
        return state.merge(Immutable.Map(payload.routes));
      }
      return state.set(payload.route.route_id, payload.route);
    default:
      return state;
  }
}

function list(state = Immutable.List(), { type, payload }) {
  switch (type) {
    case types.set:
      if (payload.list) {
        return Immutable.List(payload.list);
      }
      return state;
    default:
      return state;
  }
}

function stops(state = Immutable.Map(), { type, payload }) {
  switch (type) {
    case types.set:
      if (payload.stops) {
        return Immutable.Map(payload.stops);
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  data,
  list,
  stops
});

export const allRoutes = createSelector(
  state => state.routes.data,
  state => state.routes.list,
  (data, list) => list.toArray().map(id => data.get(id))
);

export const layers = createSelector(
  state => state.router.location.path,
  state => state.routes.list,
  state => state.routes.data,
  state => state.routes.stops,
  (path, list, data, stops) => {
    const layers = [];
    list.toArray().forEach(id => {
      const route = data.get(id);
      const lineId = `${id}Line`;
      const lineName = `${id}LineSource`;
      layers.push({
        data: {
          type: 'Feature',
          properties: {
            route: id
          },
          geometry: {
            type: 'LineString',
            coordinates: polyline
              .decode(route.poly)
              .map(point => [point[1], point[0]])
          }
        },
        layer: {
          id: lineId,
          type: 'line',
          source: lineName,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': route.color,
            'line-width': 2
          }
        }
      });
      const stopFeatures = route.stops.map(stopId => {
        const data = stops.get(stopId);
        const lngLat = [data.lng, data.lat];
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: lngLat
          },
          properties: {
            route: id,
            stop: stopId,
            lngLat,
            index: data.index
          }
        };
      });
      const stopsId = `${id}Stops`;
      const stopLabelsId = `${id}StopLabels`;
      const stopsName = `${id}StopsSource`;
      layers.push({
        data: {
          type: 'FeatureCollection',
          features: stopFeatures
        },
        layer: {
          id: stopsId,
          source: stopsName,
          type: 'circle',
          paint: {
            'circle-color': route.color,
            'circle-stroke-color': '#fff',
            'circle-radius': {
              base: 3,
              stops: [[12, 3], [15, 10]]
            },
            'circle-stroke-width': 1
          },
          layout: { visibility: 'visible' }
        },
        labels: {
          id: stopLabelsId,
          type: 'symbol',
          source: stopsName,
          paint: {
            'text-color': '#000',
            'text-halo-width': 1,
            'text-halo-color': '#fff'
          },
          layout: {
            'text-field': '{index}',
            'text-size': 10,
            'text-offset': [0, 0],
            'text-anchor': 'center',
            'text-justify': 'center'
          }
        }
      });
    });
    return layers;
  }
);
