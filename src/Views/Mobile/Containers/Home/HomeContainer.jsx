import React, { Component } from "react";
import {
  WhiteSpace,
  List,
  PullToRefresh
} from "antd-mobile";
import { StickyContainer } from "react-sticky";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Icon, Badge } from "antd";
import axios from "axios";

const Item = List.Item;
const Brief = Item.Brief;

class HomeContainer extends Component {
  state = {
    openKeys: ["sub1"],
    status: 0,
    data: [],
    name: "",
    merk: "",
    spec: "",
    lastPurchaser: "",
    store: "",
    address: "",
    telephone: "",
    web: "",
    description: "",
    note: "",
    lastPrice: 0,
    total: 0,
    count: 0,
    unitPrice: 0,
    purchasePrice: 0,

    id: "",
    orderId: "",
    loading: false,
    totalHarga: 0,
    anggaran: [],
    totalAnggaran: 0,

    dataAll: [],
    dataPurchased: [],
    dataWaiting: [],
    dataACC1: [],
    dataPending: [],
    dataRejected: [],
    dataUnprocessed: [],
    dataEstimasi: [],
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight
  };

  getDataAllStatus = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people"}`
      )
      .then(res => {
        this.setState({
          dataAll: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  getDataUnprocessed = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":0}}`
      )
      .then(res => {
        this.setState({
          dataUnprocessed: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  deleteData = _id => {
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/Orders/${_id}`)
      .then(res => {
        this.getData();
        console.log(res);
      });
  };

  componentDidMount() {
    this.getDataUnprocessed();
  }

  render() {
    return (

      <div>
        <Navbar style={{ position: "content" }} />
        <PullToRefresh
          damping={60}
          ref={el => (this.ptr = el)}
          style={{
            height: this.state.height,
            overflow: "auto"
          }}
          indicator={this.state.dataAll ? {} : { deactivate: "Refresh" }}
          direction={this.state.dataAll ? "down" : "up"}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
            this.getDataUnprocessed();
          }}
        >
          <WhiteSpace style={{ backgroundColor: "#872ef5" }} size="xs" />
          <StickyContainer>
            <div>
              {this.state.loading ? (
                this.state.dataUnprocessed.map(key => {
                  let totalharga = key.totalHarga;
                  var formattednum_totalharga = Number(
                    totalharga
                  ).toLocaleString("in-ID", {
                    style: "currency",
                    currency: "IDR"
                  });
                  return (
                    <List className="my-list">
                      <Link
                        to={{
                          pathname: `/orderdetail/${key.id}/update`
                        }}
                      >
                        <Item
                          extra={`${formattednum_totalharga}`}
                          arrow="horizontal"
                          multipleLine
                        >
                          <p>
                            <Badge status="default" />
                            {key.orderCode}
                          </p>
                          <Brief>{key.people.name}</Brief>
                        </Item>
                      </Link>
                    </List>
                  );
                })
              ) : (
                  <h1 style={{ textAlign: "center" }}>
                    Loading <Icon type="loading" theme="outlined" />
                  </h1>
                )}
            </div>
          </StickyContainer>
          <WhiteSpace />
        </PullToRefresh>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default HomeContainer;