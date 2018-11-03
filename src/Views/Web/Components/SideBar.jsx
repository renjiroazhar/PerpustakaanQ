import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
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
      <div>
      <Sider
        style={{
          background: "#f7f7f7"
        }}
      >
        {!this.state.collapsed && (
          <h3 align="center" style={{ margin: 16, color: "#872ef5", fontWeight: 'bold' }}>
            PURCHASING APP
          </h3>
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
            Add Order
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
                <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/my_order">
                <Icon type="shopping-cart" />
                <span>My Order</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="clock-circle" />
                <span>Order History</span>
              </span>
            }
          >
            <Menu.Item key="3">
                <Link to="/order_history/monthly">
                    Monthly
                </Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link to="/order_history/yearly">
                    Yearly
                </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to={"/account"}>
                <Icon type="user" />
                <span>Account</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="setting" theme="outlined" />
                <span>Master</span>
              </span>
            }
          >
            <Menu.Item key="6">
                <Link to="/master/users">
                    Users
                </Link>
            </Menu.Item>
            <Menu.Item key="7">
                <Link to="/master/divisi">
                    Divisi
                </Link>
            </Menu.Item>
            <Menu.Item key="8">
                <Link to="/master/bagian">
                    Bagian
                </Link>
            </Menu.Item>
            <Menu.Item key="9">
                <Link to="/master/anggaran">
                    Anggaran
                </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      </div>
    );
    
  }
}

export default SideBar;