import React, { Component } from 'react'
import { List } from "antd-mobile";
import axios from "axios";
import { Badge } from "antd";
import { Link } from "react-router-dom";

const Item = List.Item;
const Brief = Item.Brief;


export default class DipinjamContainer extends Component {
  state = {
    openKeys: ["sub1"],
    data: [],
    loading: false
  };

  getDataHome = () => {
    axios
      .get(
        `http://localhost:8000/api/Items?filter={"include":"borrow","where":{"status":{"neq":2}}}`
      )
      .then(res => {
        this.setState({
          data: res.data,
          loading: true
        });
        console.log(res);
      });
  };

  onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  //Ganti Status 1. Returned , 2. Penalty 
  statusPenalty = id => {
    axios
      .patch(`http://localhost:8000/api/Items/${id}`, {
        status: 2
      })
      .then(res => {
        this.getDataHome();
      })
      .catch(err => alert(` Error O' `));
  };

  statusReturned = id => {
    axios
      .patch(`http://localhost:8000/api/Items/${id}`, {
        status: 1
      })
      .then(res => {
        this.getDataHome();
      })
      .catch(err => alert(` Error O' `));
  };

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  componentDidMount() {
    this.getDataHome();
  }

  render() {
    return (
      <div>
        {this.state.data.map(key => {
          //state.namaobj.map(param => {})
          if (key.status === 0) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/myorderdetail`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.name}</p>
                      <Badge status="default" />
                      {key.bookcode}{" "}
                    </Item>
                  </Link>
                </List>
              </div>
            );
          } else if (key.status === 1) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/detailpurchased`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.name}</p>
                      <Brief>{key.bookcode}</Brief>
                      <Badge status="returned" text="Dikembalikan" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          } else if (key.status === 2) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/myorderdetail`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.name} </p>
                      <Brief>{key.bookcode}</Brief>
                      <Badge status="penalty" text="Denda" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          }
        })}
      </div>
    )
  }
}
