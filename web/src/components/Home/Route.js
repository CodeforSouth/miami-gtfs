import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.css';
import { routeType } from 'lib/gtfs';

const mapDispatchToProps = {
  push
};

class Route extends Component {
  _onClick = e => {
    e.preventDefault();
    const url = `/route/${this.props.data.id}`;
    this.props.push(url);
  };
  render() {
    const data = this.props.data;
    const url = `/route/${data.id}`;
    const style = {
      background: data.color
    };
    return (
      <a className={styles.container} href={url} onClick={this._onClick}>
        <div className={styles.item}>
          <div className={styles.name}>{data.stops.length} stops</div>
          <div className={styles.info}>
            <div className={styles.number}>{data.name}</div>
            <div className={styles.type} style={style}>
              TROLLEY
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default connect(null, mapDispatchToProps)(Route);
