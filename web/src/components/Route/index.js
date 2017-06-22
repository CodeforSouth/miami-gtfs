import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './styles.css';

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
    return (
      <a className={styles.container} href={url} onClick={this._onClick}>
        <div className={styles.item}>
          <div className={styles.number}>
            {data.route_short_name}
          </div>
          <div className={styles.name}>
            {data.route_long_name}
          </div>
        </div>
      </a>
    );
  }
}
