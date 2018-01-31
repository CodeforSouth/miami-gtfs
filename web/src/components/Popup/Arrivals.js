import React, { Component } from 'react';
import fetch from 'fetch-jsonp';

import styles from './styles.css';

class Arrivals extends Component {
  state = {
    times: ''
  };

  async componentDidMount() {
    await this._getArrivals();
    this._interval = setInterval(this._getArrivals, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  _getArrivals = async () => {
    const id = this.props.id;
    const url = `https://publictransportation.tsomobile.com/rest/PubTrans/GetModuleInfoPublic?Key=STOPINFO_WITHOVERLAPS&id=${id}&_=${Date.now()}`;
    const res = await fetch(url)
      .then(res => res.json())
      .then(json => JSON.parse(json));
    const times = res[1]
      .map(time => {
        const eta = parseInt(time.ETASeconds, 10);
        const minutes = Math.floor(eta / 60);
        const seconds = eta % 60;
        return `${minutes}:${seconds}m`;
      })
      .join(' ');
    this.setState({
      times
    });
  };

  render() {
    return <div className={styles.arrivals}>{this.state.times}</div>;
  }
}

export default Arrivals;
