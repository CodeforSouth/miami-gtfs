import React, { Component } from 'react';

import MapView from 'components/MapView';
import Popup from 'components/Popup';
import styles from './styles.css';

class Chrome extends Component {
  render() {
    return (
      <div className={styles.chrome}>
        <MapView />
        <Popup />
        {this.props.children}
      </div>
    );
  }
}

export default Chrome;
