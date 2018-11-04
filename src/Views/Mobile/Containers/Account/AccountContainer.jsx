import React, { Component } from "react";
import {
  NavBar,
  List,
  Modal,
} from "antd-mobile";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Item = List.Item;
const alert = Modal.alert;

class AccountContainer extends Component {
  state = {
    dataUser: [],
    role : 0,
    name : "",
    username  : "",
    password : "",
    email : ""

  };

  onChangeTab = selectedTab => {
    this.setState({
      selectedTab: selectedTab
    });
  };

  getDataEdit = () => {
    let userId = sessionStorage.getItem("userId");
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/People/${userId}`)
      .then(res => {
        this.setState({
          role: res.data.role,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          dataUser : res.data
        });
      });
  };

  logout = () => {
    this.props.updateLogout();
  };

  componentDidMount(){
    this.getDataEdit();
  }

  render() {
    return (
      <div>
        <NavBar
          style={{
            backgroundColor: "#872ef5",
            height: "60px",
            zIndex: "-100"
          }}
          mode="light"
        >
          <Icon
            style={{
              color: "#FFF",
              textAlign: "left",
              size: "20px",
              marginRight: "15px",
              marginBottom: "10px"
            }}
            type="smile"
          />{" "}
          <h3 style={{ color: "#FFF", marginRight: "165" }}>
            {" "}
            {`Halo, ${this.state.dataUser.name}`}{" "}
          </h3>
        </NavBar>

        <List>
          <Link to={`/account/reset_password`}>
            <Item
              thumb={<Icon type="lock" theme="outlined" />}
              key="reset_password"
              // selected={this.props.selectedTab === "reset_password"}
              // onClick={() => { this.props.onChangeTab('reset_password') }}
            >
              Ganti Kata Sandi
            </Item>
          </Link>
        </List>

        <List>
          <Link to={`/account/input_anggaran`}>
            <Item
              thumb={<Icon type="wallet" theme="outlined" />}
              key="input_anggaran"
              // selected={this.props.selectedTab === "input_anggaran"}
              // onClick={() => { this.props.onChangeTab('input_anggaran') }}
            >
              Input Anggaran
            </Item>
          </Link>
        </List>

        <List>
          <Item
            thumb={<Icon type="logout" theme="outlined" />}
            style={{ color: "red" }}
            
            onClick={() =>
              alert("Logout", "Logout Akun?", [
                { text: "Cancel", onPress: () => console.log("cancel") },
                { text: "Ok", onPress: () => this.logout() }
              ])
            }
          >
            Logout
          </Item>
        </List>
      </div>
    );
  }
}

export default AccountContainer;
