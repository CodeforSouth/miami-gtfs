import React, { Component } from 'react';

import MapView from 'components/MapView';
import styles from './styles.css';

class Chrome extends Component {
  render() {
    return (
      <div className={styles.chrome}>
        <MapView />
        {this.props.children}
      </div>
    );
  }
}

export default Chrome;
