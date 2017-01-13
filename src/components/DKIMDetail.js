import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import config from '../config';

import HeaderTable from './DKIMDetailHeaderTable';
import SignatureTable from './DKIMSignatureTable';

export default class DKIMDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      error: null,
      detail: null,
      loading: false // should this just be true at first?
    }
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail() {
    const { email, detailId } = this.props;
    this.setState({ loading: true });
    return axios.get(`${config.apiBase}/messaging-tools/validations/${email}/${detailId}`)
      .then(({ data }) => {
        const { results } = data;
        this.setState({
          detail: results,
          loading: false
        });
      }, ({ response = null }) => {
        this.setState({
          error: response ? response.data.errors[0] : true,
          loading: false
        });
      });
  }

  render() {
    const { detail = {}, error } = this.state;
    return (
      <div>
        <div className='button-header'>
          <Link to={`/dkim/results/${this.props.email}`} className='button button--muted'><i className='fa fa-arrow-left'></i> Back</Link>
          <button className='button button--muted'><i className='fa fa-share-alt'></i> Share</button>
        </div>
        {error && <p>An error occurred getting details</p>}
        <HeaderTable detail={detail} />
        <SignatureTable sigs={detail && detail.sigs} />
      </div>
    )
  }
}
