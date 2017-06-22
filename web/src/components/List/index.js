import React, { Component } from 'react';
import styles from './styles.css';

export default class List extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
