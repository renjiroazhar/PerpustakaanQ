import React, { Component } from "react";
import { NavBar } from "antd-mobile";
import { Input } from "antd";
import axios from "axios";

const Search = Input.Search;

class Navbar extends Component {
  state = {
    searchItem: "",
    data: [],
    orderData: [],
    visible: false,
    modal1: false,
    modal2: false,
  };


  getSearch = value => {
    axios
      .get(
        `http://localhost:8000/api/Items?filter={"where":{"name":{"like":"${value}"}},"include":"borrow"}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
        console.log(res.data.order)
        this.showModal("modal1");
        this.showModal1og();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <NavBar
          style={{
            backgroundColor: "#0088aaff",
            zIndex: "-100",
            padding: "30px 0px 30px 0px"
          }}
          mode="light"
        >
          <Search
            value={this.state.searchItem}
            name="searchItem"
            onChange={this.handleChange}
            style={{
              marginBottom: "20px",
              marginTop: "20px",
              width: "250px",
              border: "none",
              backgroundColor: "#0088aaff"
            }}
            placeholder="Search"
            maxLength={20}
            onSearch={value => {
              this.getSearch(value);
            }}
          />

        </NavBar>
      </div>
    );
  }
}

export default Navbar;