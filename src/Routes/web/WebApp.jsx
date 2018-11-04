import React, { Component } from "react";
import { Layout, Row, Col, Button, List } from "antd";
import { Input, Modal } from "antd";
import { Link, Route } from "react-router-dom";
import SideBar from '../../Views/Web/Components/SideBar';
import Loadable from "react-loadable";
import axios from "axios";

const { Header, Content } = Layout;
const Search = Input.Search;

const loading = () => (
  <div className="loading-bro">
    <h1>Loading</h1>
    <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
      <circle id="loading-inner" cx="75" cy="75" r="60" />
    </svg>
  </div>
);

const Home = Loadable({
  loader: () => import("../../Views/Web/Containers/Home"),
  loading: loading
});


const Account = Loadable({
  loader: () => import("../../Views/Web/Containers/Account"),
  loading: loading
});

const OrderEdit = Loadable({
  loader: () => import("../../Views/Web/Containers/OrderDetail/OrderEdit"),
  loading: loading
});

const OrderDetailForEdit = Loadable({
  loader: () => import("../../Views/Web/Containers/OrderDetail/OrderDetailForEdit"),
  loading: loading
});

const DetailOrder = Loadable({
  loader: () => import("../../Views/Web/Containers/OrderDetail/DetailOrder"),
  loading: loading
});

const TambahBarang = Loadable({
  loader: () => import("../../Views/Web/Containers/OrderDetail/TambahBarang"),
  loading: loading
});

const Anggaran = Loadable({
  loader: () => import("../../Views/Web/Containers/Master/AnggaranContainer"),
  loading: loading
});

const Bagian = Loadable({
  loader: () => import("../../Views/Web/Containers/Master/BagianContainer"),
  loading: loading
});

const Divisi = Loadable({
  loader: () => import("../../Views/Web/Containers/Master/DivisiContainer"),
  loading: loading
});

const Users = Loadable({
  loader: () => import("../../Views/Web/Containers/Master/UsersContainer"),
  loading: loading
});

const UsersUpdate = Loadable({
  loader: () => import("../../Views/Web/Containers/Master/UsersUpdate"),
  loading: loading
});

const PageNotFound = Loadable({
  loader: () => import("../PageNotFound"),
  loading: loading
});

export default class WebApp extends Component {
  logout = () => {
    //client.logout();
    this.props.updateLogout();
  };

  
  state = {
    searchItem: "",
    data: [],
    orderData : [],
    visible: false
  };

  //{"where":{"name":{"like":"Widi"}},"include":"order"}

  getSearch = value => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Items?filter={"where":{"name":{"like":"${value}"}},"include":"order"}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
        console.log(res.data.order)
        this.showModal();
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  showConfirm = () => {
    const confirm = Modal.confirm;
    const logout = this.logout;
    confirm({
      title: "Anda yakin ingin keluar?",
      content: "",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      onOk() {
        logout();
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

 

  render() {
    let userRole = sessionStorage.getItem("role");
    console.log(userRole);
    return (
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <SideBar />
        <Layout>
          <Header
            style={{ background: "#fff", paddingLeft: 48, paddingRight: 24 }}
          >
            <Row>
              <Col span={20}>
                <Search
                  placeholder="Cari 982 Barang"
                  name="searchItem"
                  value={this.state.searchItem}
                  onChange={this.handleChange}
                  enterButton={
                    <Button
                      onClick={() => {
                        this.getSearch();
                      }}
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
                  onSearch={value => {
                    this.getSearch(value);
                  }}
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
                  onClick={this.showConfirm}
                >
                  Keluar
                </Button>
              </Col>
            </Row>
          </Header>

          <Modal
            title="Item List"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                  
                    title={<Link  to={{
                      pathname: `/orderdetail/${item.orderId}/update`,
                      state: {
                        orderId: item.orderId,
                        orderCode: item.orderCode,
                        category: item.category,
                        status: item.status,
                        note: item.note,
                        divisiId: item.divisiId,
                        bagianId: item.bagianId,
                        totalHarga: item.totalHarga
                      }
                    }}>{item.name}
                   
                    </Link>}
                  description={<Link  to={{
                    pathname: `/orderdetail/${item.orderId}/update`,
                    state: {
                      orderId: item.orderId,
                      orderCode: item.orderCode,
                      category: item.category,
                      status: item.status,
                      note: item.note,
                      divisiId: item.divisiId,
                      bagianId: item.bagianId,
                      totalHarga: item.totalHarga
                    }
                  }}>{`#${item.order.orderCode}`}</Link>}
                  />
                {`Rp. ${item.total}`}
                </List.Item>
              )}
            />
            
          </Modal>

          <Content style={{ background: "#fff" }}>
            <div
              style={{
                marginLeft: 24,
                marginRight: 24,
                padding: 24,
                background: "#fff",
                minHeight: 360
              }}
            >
              <Route exact path="/" component={Home} />
             

              <Route exact path="/account" component={Account} />
              <Route
                exact
                path="/master/users"
                render={props => {
                  if (userRole === 3 || userRole === 4) {
                    return <Users />;
                  } else {
                    return <PageNotFound />;
                  }
                }}
              />
              <Route
                exact
                path="/master/anggaran"
                render={props => {
                  if (userRole === 3 || userRole === 4) {
                    return <Anggaran />;
                  } else {
                    return <PageNotFound />;
                  }
                }}
              />

              <Route
                exact
                path="/master/divisi"
                render={props => {
                  if (userRole === 3 || userRole === 4) {
                    return <Divisi />;
                  } else {
                    return <PageNotFound />;
                  }
                }}
              />

              <Route
                exact
                path="/master/bagian"
                render={props => {
                  if (userRole === 3 || userRole === 4) {
                    return <Bagian />;
                  } else {
                    return <PageNotFound />;
                  }
                }}
              />

              <Route exact path="/orderdetail/:id" component={DetailOrder} />

              <Route
                exact
                path="/orderdetail/update/:id"
                component={OrderEdit}
              />

              <Route
                exact
                path="/orderdetail/:id/update"
                component={OrderDetailForEdit}
              />

              <Route
                exact
                path="/orderdetail/update/addnewbarang/:id"
                component={TambahBarang}
              />

              <Route
                exact
                path="/users"
                render={props => {
                  if (userRole === 3 || userRole === 4) {
                    return <Users />;
                  } else {
                    return <PageNotFound />;
                  }
                }}
              />
              <Route exact path="/master/users/:id" component={UsersUpdate} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
