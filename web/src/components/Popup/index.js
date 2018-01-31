import React, { Component } from 'react';
import { connect } from 'react-redux';

import Popup from './Popup';
import { data } from 'reducers/popup';

class PopupContainer extends Component {
  render() {
    if (!this.props.data) return null;
    return <Popup data={this.props.data} />;
  }
}

const mapStateToProps = state => ({
  data: data(state)
});

export default connect(mapStateToProps)(PopupContainer);
