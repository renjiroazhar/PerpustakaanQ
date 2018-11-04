import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import "./style/style.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SideBar extends Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        style={{
          background: "#f7f7f7"
        }}
      >
        {!this.state.collapsed && (
          <h2 align="center" className="judul" style={{ margin: 16, color: "#872ef5", fontWeight: 'bold' }}>
           PerpustakaanQ
          </h2>
        )}
        {this.state.collapsed && (
          <h3 align="center" style={{ margin: 16, color: "#872ef5" }}>
            PA
          </h3>
        )}
        <Link to="/add_order">
            <Button
            style={{
                margin: 16,
                backgroundColor: "#00ae69",
                width: "80%",
                borderColor: "transparent",
                borderRadius : '3px'
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
                <Link to="/borrow_history/monthly">
                    Bulanan
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/borrow_history/yearly">
                    Tahunan
                </Link>
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
    );    
  }
}

export default SideBar;