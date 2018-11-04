import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { Icon } from "antd";
import { Link} from 'react-router-dom';

class BottomNavbar extends Component {
  
  render() {
    return (
      <div style={{
        width: "100%",
        position: "fixed",
        bottom: "0"
      }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#872ef5"
          barTintColor="white"
          defaultSelectedKeys={["home"]}
          mode="inline"
          >
          <TabBar.Item
            title="List"
            key="list"
            icon={<Link to="/"><Icon type="home" /></Link>}
            // selectedIcon={<Icon type="home" />}
            // selected={this.props.selectedTab === "list"}
            // onPress={()=>{this.props.onChangeTab('list')}}
          />
          <TabBar.Item
            icon={<Link to="/my_order"><Icon type="shopping-cart" /></Link>}
            // selectedIcon={<Icon type="shopping-cart" />}
            title="My Order"
            key="myOrder"
            // badge={"new"}
            // selected={this.props.selectedTab === "myOrder"}
          // onClick={()=>{<Link to="/my_order"></Link>}}
          />
          <TabBar.Item
            icon={<Link to="/add_order"><Icon type="plus" /></Link>}
            // selectedIcon={<Icon type="plus" />}
            title="Add Order"
            key="addOrder"
            dot
            
            // selected={this.props.selectedTab === "addOrder"}
            // onPress={()=>{this.props.onChangeTab('addOrder')}}
          />
          <TabBar.Item
            icon={<Link to="/history"><Icon type="clock-circle" /></Link>}
            title="History"
            key="history"
            // dot
            // selected={this.props.selectedTab === "history"}
            // onPress={()=>{this.props.onChangeTab('history')}}
           />
          <TabBar.Item
            icon={<Link to="/account"><Icon type="user" /></Link>}
            // selectedIcon={<Icon type="user" />}
            title="Account"
            key="account"
            // selected={this.props.selectedTab === "account"}
            // onPress={()=>{this.props.onChangeTab('account')}}
           />
        </TabBar>
      </div>
    );
  }
}

export default BottomNavbar;
