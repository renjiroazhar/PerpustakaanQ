import React, { Component } from "react";
import {
  Tabs,
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  PullToRefresh
} from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Icon, Badge, Divider } from "antd";
import axios from "axios";

const Item = List.Item;
const Brief = Item.Brief;

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => (
        <div style={{ ...style, zIndex: -1 }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  );
}
const tabs = [
  {
    title: <i class="material-icons">format_list_bulleted</i>
  },
  {
    title: <i class="material-icons">query_builder</i>
  },
  {
    title: <i class="material-icons">remove_circle_outline</i>
  },
  {
    title: <i class="material-icons">done</i>
  },
  { title: <i class="material-icons">done_all</i> },
  {
    title: <i class="material-icons">local_grocery_store</i>
  }
];

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

  getDataPurchased = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":1}}`
      )
      .then(res => {
        this.setState({
          dataPurchased: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  getDataWaiting = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":2}}`
      )
      .then(res => {
        this.setState({
          dataWaiting: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  getDataACC1 = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":3}}`
      )
      .then(res => {
        this.setState({
          dataACC1: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  getDataPending = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":4}}`
      )
      .then(res => {
        this.setState({
          dataPending: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  getDataRejected = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":5}}`
      )
      .then(res => {
        this.setState({
          dataRejected: res.data,
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

  getDataAnggaran = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalAnggaran"
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res);
      });
  };

  getTotalEstimasi = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalEstimasi"
      )
      .then(res => {
        this.setState({
          dataEstimasi: res.data
        });
      });
  };

  componentDidMount() {
    this.getDataUnprocessed();
    this.getDataAnggaran();
    this.getDataPurchased();
    this.getDataWaiting();
    this.getDataACC1();
    this.getDataPending();
    this.getDataRejected();
    this.getTotalEstimasi();
  }

  render() {
    let anggaranSemua = this.state.data.totalAnggaran;
    var formated_num = Number(anggaranSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    let estimasiSemua = this.state.dataEstimasi.totalEstimasi;
    var formattednum_estimasi = Number(estimasiSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });
    return (
      <div>
        <Navbar style={{ position: "content" }} />
        <WingBlank>
          <div
            style={{ position: "absolute", height: "10px" }}
            className="sub-title"
          />
        </WingBlank>

        <WhiteSpace style={{ backgroundColor: "#872ef5" }} />
        <Flex
          style={{
            textAlign: "center",
            backgroundColor: "#872ef5",
            paddingTop: "5px"
          }}
        >
          <Flex.Item
            style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
          >
            {formated_num} <br />
            <p
              style={{ color: "white", fontWeight: "normal", fontSize: "10px" }}
            >
              {" "}
              SISA BUDGET{" "}
            </p>
          </Flex.Item>
          <Divider type="vertical" />
          <Flex.Item
            style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}
          >
            {" "}
            {formattednum_estimasi}
            <br />
            <p
              style={{ color: "white", fontWeight: "normal", fontSize: "10px" }}
            >
              {" "}
              ESTIMASI{" "}
            </p>
          </Flex.Item>
        </Flex>
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
            this.getDataPending();
            this.getDataRejected();
            this.getDataACC1();
            this.getDataWaiting();
            this.getDataPurchased();
          }}
        >
          <WhiteSpace style={{ backgroundColor: "#872ef5" }} size="xs" />
          <StickyContainer>
            <Tabs tabs={tabs} initalPage={"t2"} renderTabBar={renderTabBar}>
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
              <div>
                {this.state.loading ? (
                  this.state.dataPending.map(key => {
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
                            pathname: `/orderdetail/${key.id}/detailpending`
                          }}
                        >
                          <Item
                            extra={`${formattednum_totalharga}`}
                            arrow="horizontal"
                            multipleLine
                          >
                            <p>
                              {" "}
                              <Badge status="warning" />
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
              <div>
                {this.state.loading ? (
                  this.state.dataRejected.map(key => {
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
                            pathname: `/orderdetail/${key.id}/detailrejected`
                          }}
                        >
                          <Item
                            extra={`${formattednum_totalharga}`}
                            arrow="horizontal"
                            multipleLine
                          >
                            <p>
                              <Badge status="error" />
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
              <div>
                {this.state.loading ? (
                  this.state.dataACC1.map(key => {
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
                            pathname: `/orderdetail/${key.id}/detailacc1`
                          }}
                        >
                          <Item
                            extra={`${formattednum_totalharga}`}
                            arrow="horizontal"
                            multipleLine
                          >
                            <p>
                              <Badge status="success" />
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
              <div>
                {this.state.loading ? (
                  this.state.dataWaiting.map(key => {
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
                            pathname: `/orderdetail/${key.id}/detailwaiting`
                          }}
                        >
                          <Item
                            extra={`${formattednum_totalharga}`}
                            arrow="horizontal"
                            multipleLine
                          >
                            <p>
                              <Badge status="processing" />
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
              <div>
                {this.state.loading ? (
                  this.state.dataPurchased.map(key => {
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
                            pathname: `/orderdetail/${key.id}/detailpurchased`
                          }}
                        >
                          <Item
                            extra={`${formattednum_totalharga}`}
                            arrow="horizontal"
                            multipleLine
                          >
                            <p>
                              <Badge status="success" />
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
            </Tabs>
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
