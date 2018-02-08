import React, { Component } from 'react';

import styles from './styles.css';
import Arrivals from './Arrivals';

class Popup extends Component {
  render() {
    const { id, position, stop, route } = this.props.data;
    const style = {
      top: position.y - 110,
      left: position.x - 100
    };
    return (
      <div className={styles.popup} style={style}>
        <div className={styles.body}>
          <div className={styles.route}>{route.name}</div>
          <div className={styles.stop}>
            {stop.index}. {stop.name}
          </div>
          <Arrivals id={id} />
        </div>
      </div>
    );
  }
}

export default Popup;
