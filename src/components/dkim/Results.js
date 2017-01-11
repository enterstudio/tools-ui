import React, { Component } from 'react'

export default class extends Component {
  render() {
    const { params } = this.props;
    return (
      <p>RESULTS {params.email}</p>
    )
  }
}
