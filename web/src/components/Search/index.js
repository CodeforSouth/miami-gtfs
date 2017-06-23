import React, { Component } from 'react';
import styles from './styles.css';

const Clear = ({ show, onClick }) => {
  if (show) {
    return (
      <div className={styles.clear}>
        <div className={styles.clearBtn} onClick={onClick} />
      </div>
    );
  }
  return null;
};

export default class Search extends Component {
  _filter = e => {
    this.props.onChange(e.target.value);
  };

  _clear = () => {
    this.props.onChange('');
  };
  render() {
    const showClear = !!this.props.value.length;
    return (
      <div className={styles.container}>
        {this.props.children}
        <div className={styles.search}>
          <input
            type="text"
            className={styles.input}
            onChange={this._filter}
            value={this.props.value}
            placeholder={this.props.placeholder}
          />
          <Clear show={showClear} onClick={this._clear} />
        </div>
      </div>
    );
  }
}
