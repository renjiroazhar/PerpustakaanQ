import React, { Component } from "react";
import BottomNavbar from "../../Views/Mobile/Components/BottomNavbar";
import AccountContainer from "../../Views/Mobile/Containers/Account/AccountContainer";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router";
import { ActivityIndicator } from "antd-mobile";
import axios from "axios";



const loading = () => <ActivityIndicator />;

const Home = Loadable({
  loader: () => import("../../Views/Mobile/Containers/Home"),
  loading: loading
});

const ResetPassword = Loadable({
  loader: () => import("../../Views/Mobile/Containers/Account/ResetPassword"),
  loading: loading
});

const AddOrder = Loadable({
  loader: () => import("../../Views/Mobile/Containers/AddOrder"),
  loading: loading
});

const OrderDetail = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/OrderDetail"),
  loading: loading
});

const DetailPending = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/DetailPending"),
  loading: loading
});

const DetailPurchased = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/DetailPurchased"),
  loading: loading
});

const OrderEdit = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/OrderEdit"),
  loading: loading
});

const History = Loadable({
  loader: () => import("../../Views/Mobile/Containers/History/HistoryContainer"),
  loading: loading
});

const DetailHistory = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/DetailHistory"),
  loading: loading
});

const TambahBarang = Loadable({
  loader: () => import("../../Views/Mobile/Containers/OrderDetail/TambahBarang"),
  loading: loading
});

class MobileApp extends Component {
  // state = {
  //   selectedTab: "list"
  // }

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

    selectedTab: "list"
  };

  getData = () => {
    axios
      .get("https://purchasing-stagging.herokuapp.com/api/Orders")
      .then(res => {
        this.setState({
          data: res.data,
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
    this.getData();
  }

  onChangeTab = selectedTab => {
    // console.log('hello')
    this.setState({
      selectedTab: selectedTab
    });
  };

  logout = () => {
    //client.logout();
    this.props.updateLogout();
  };

  render() {
    return (
      <div>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route exact path="/add_order" component={AddOrder} />
              <Route exact path="/orderdetail/:id/update" component={OrderDetail} />
              <Route exact path="/account" render={() => <AccountContainer updateLogout={this.logout} />} />
              <Route exact path="/account/reset_password" component={ResetPassword} />
              <Route exact path="/history" component={History} />

              <Route
                exact
                path="/orderdetail/update/:id"
                component={OrderEdit}
              />

              <Route

                path="orderdetail/:id/update"
                component={OrderDetail}
              />
              <Route path="/orderdetail/:id/detailpending" component={DetailPending} />
              <Route path="/orderdetail/:id/detailpurchased" component={DetailPurchased} />

              <Route
                exact
                path="/orderdetail/update/addnewbarang/:id"
                component={TambahBarang}
              />

              <Route
                exact
                path="/history/detail/:id/"
                component={DetailHistory}
              />
            </Switch>
          )}
        />
        <BottomNavbar
          selectedTab={this.state.selectedTab}
          onChangeTab={this.onChangeTab}
        />
      </div>
    );
  }
}

export default MobileApp;