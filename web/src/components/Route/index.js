import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.css';
import { routeType } from 'lib/gtfs';

const mapDispatchToProps = {
  push,
};

@connect(null, mapDispatchToProps)
export default class Route extends Component {
  _onClick = e => {
    e.preventDefault();
    const url = `/route/${this.props.data.id}`;
    this.props.push(url);
  };
  render() {
    const data = this.props.data;
    const url = `/route/${this.props.data.id}`;
    const type = routeType(data.route_type);
    return (
      <a className={styles.container} href={url} onClick={this._onClick}>
        <div className={styles.item}>
          <div className={styles.name}>
            {data.route_long_name}
          </div>
          <div className={styles.info}>
            <div className={styles.number}>
              {data.route_short_name}
            </div>
            <div className={styles.type} style={type.style}>
              {type.text}
            </div>
          </div>
        </div>
      </a>
    );
  }
}
