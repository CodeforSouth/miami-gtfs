import React, { Component } from 'react';
import styles from './styles.css';

export default class List extends Component {
  setScrollTop = y => {
    this._list.scrollTop = y;
  };
  _setListRef = ref => {
    this._list = ref;
  };
  render() {
    return (
      <div className={styles.container} ref={this._setListRef}>
        {this.props.children}
      </div>
    );
  }
}
