import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { stopSelector } from 'reducers/stops';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw',
});

const mapStateToProps = state => ({
  stops: stopSelector(state),
});

@connect(mapStateToProps)
export default class MapView extends Component {
  static mapStyle = 'mapbox://styles/mapbox/streets-v9';
  static mapCenter = [-80.298386, 25.794859];
  static containerStyle = {
    height: '100%',
    width: '100%',
  };

  render() {
    return (
      <div className={styles.map}>
        <Map
          style={MapView.mapStyle}
          containerStyle={MapView.containerStyle}
          center={MapView.mapCenter}
        >
          {/*this.props.stops.map(stop => {
            const coords = [stop.stop_lon, stop.stop_lat];
            return (
              <Marker coordinates={coords} anchor="bottom" key={stop.stop_id}>
                <div className={styles.stop} />
              </Marker>
            );
          })*/}
        </Map>
      </div>
    );
  }
}
