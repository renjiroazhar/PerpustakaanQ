import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import "./style/style.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import logoPerpus from "./logo/logoPerpustakaanQ.png";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120,
    marginRight: "30px"
  },
  selectEmptyOne: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    justifyContent: "flex-start"
  },
  selectEmptyTwo: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    justifyContent: "flex-end"
  }
});

class SideBar extends Component {
  state = {
    collapsed: false,
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        <Sider
          style={{
            background: "#f7f7f7",
            height: "100%"
          }}
        >
          {!this.state.collapsed && (
            <div style={{ textAlign: "center", margin: "17px" }}>
              <img
                height="20px"
                width="150px"
                src={logoPerpus}
                alt="PerpustakaanQ Logo"
              />
            </div>
          )}
          {this.state.collapsed && (
            <h3 align="center" style={{ margin: 16, color: "#872ef5" }}>
              PQ
            </h3>
          )}
          <Link to="/pinjam">
            <Button
              style={{
                margin: 16,
                backgroundColor: "#00ae69",
                width: "80%",
                borderColor: "transparent",
                borderRadius: "3px"
              }}
              type="primary"
              icon="plus"
              size="large"
            >
              Pinjam Buku
            </Button>
          </Link>

          <Menu
            theme="light"
            style={{
              background: "#f7f7f7"
            }}
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="bars" theme="outlined" />
                <span>Beranda</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="clock-circle" />
                  <span>Riwayat Pinjam</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to="/borrow_history/monthly">Bulanan</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/borrow_history/yearly">Tahunan</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Link to={"/account"}>
                <Icon type="user" />
                <span>Akun</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
