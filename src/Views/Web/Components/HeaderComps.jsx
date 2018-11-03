import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'antd';

const Search = Input.Search;

export default class Header extends Component {
  render() {
    return (
      <div>
                <Row>
                  <Col span={20}>
                    <Search
                      placeholder="Cari 982 Barang"
                      enterButton={
                        <Button
                          
                          style={{
                            textAlign: "center",
                            backgroundColor: "#872ef5",
                            width: "100%",
                            color: "#fff",
                            borderColor: "transparent",
                            borderRadius: "3px"
                          }}
                        >
                          Cari
                        </Button>
                      }
                      size="large"
                      // onSearch={value => {
                      //   this.getSearch(value);
                      // }}
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      style={{
                        marginLeft: 24,
                        backgroundColor: "white",
                        width: "80%",
                        color: "#f0555a",
                        borderColor: "#f0555a"
                      }}
                      type="primary"
                      icon="logout"
                      size="large"
                      
                    >
                      Keluar
                    </Button>
                  </Col>
                </Row>

    
      </div>
    )
  }
}
