import React, { Component } from 'react';
import Effort from './svg/effort.svg';
import { Row } from 'antd';

export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <Row col={20}
          style={{
            textAlign: 'center',
            marginTop: '150px'
          }}>
          <br />
          <h1 style={{ color: '#f0555a' }}>
            <img
              src={Effort}
              height="100px"
              width="100px"
              alt="Currency free icon"
            />Sorry, Your Account is Limited!
          </h1>
        </Row>
      </div>
    )
  }
}