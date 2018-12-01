import React, { Component } from "react";
import { List } from "antd-mobile";
import axios from "axios";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Item = List.Item;
const Brief = Item.Brief;

export default class HistoryTahunan extends Component {
  state = {
    openKeys: ["sub1"],
    data: [],
    dataTahun: [],
    history: "",
    totalEstimasiSemua: 0,
    totalEstimasiPerbulan: [],
    namaBulan: "",
    namaTahun: 0,
    tahun: "",
    loading: false
  };

  getDataTahunan = tahunan => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"and":[{"createdAt":{"gt":"${tahunan}-1-1"}},{"createdAt":{"lt":"${tahunan}-12-31"}}],"status":"1"}}`
      )
      .then(res => {
        this.setState({
          dataTahun: res.data
        });
        console.log(res.data);
        
      });
  };

  getDataTahunSekarang = () => {
    var today = new Date();
    let todayYear = today.getFullYear();
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"and":[{"createdAt":{"gt":"${todayYear}-1-1"}},{"createdAt":{"lt":"${todayYear}-12-31"}}],"status":"1"}}`
      )
      .then(res => {
        this.setState({
          dataTahun: res.data
        });
        console.log(res.data);
        
      });
  };

  handleChangesOptionTahun = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.setState({
      tahun: e.target.value,
      namaTahun: e.target.value
    });
    console.log(this.state);
    this.getDataTahunan(e.target.value);
  };

  componentDidMount() {
    this.getDataTahunan();
    this.getDataTahunSekarang();
  }

  render() {

    return (
      <div>
        <br />
        <form>
          <h4 style={{ margin: "0px 10px 0px 10px" }}>Pilih Tahun</h4>
          <List>
            <Select
              value={this.state.tahun}
              onChange={this.handleChangesOptionTahun}
              inputProps={{
                name: "tahun",
                id: "age-simple"
              }}
              style={{ width: "100%" }}
              name="tahun"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>- Tahun -</MenuItem>
              <MenuItem value={2018}>2018</MenuItem>
              <MenuItem value={2019}>2019</MenuItem>
              <MenuItem value={2020}>2020</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2025}>2025</MenuItem>
              <MenuItem value={2026}>2026</MenuItem>
              <MenuItem value={2027}>2027</MenuItem>
              <MenuItem value={2028}>2028</MenuItem>
              <MenuItem value={2029}>2029</MenuItem>
            </Select>
          </List>
          <br />
        </form>

        {this.state.dataTahun.map(key => {
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
                      <Badge status="default" />
                      {key.orderCode} <Brief>{key.people.name}</Brief>
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
                      <p>{key.orderCode}</p>
                      <Brief>{key.people.name}</Brief>
                      <Badge status="success" text="Purchased" />
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
                      <p>{key.orderCode} </p>
                      <Brief>{key.people.name}</Brief>
                      <Badge status="processing" text="waiting" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          } else if (key.status === 3) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/myorderdetail`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.orderCode} </p>
                      <Brief>{key.people.name}</Brief>
                      <Badge status="success" text="ACC1" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          } else if (key.status === 4) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/myorderdetail`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.orderCode} </p>
                      <Brief>{key.people.name}</Brief>
                      <Badge status="warning" text="pending" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          } else if (key.status === 5) {
            return (
              <div>
                <List className="my-list">
                  <Link
                    to={{
                      pathname: `/orderdetail/${key.id}/detailrejected`
                    }}
                  >
                    <Item arrow="horizontal" multipleLine>
                      <p>{key.orderCode} </p>
                      <Brief>{key.people.name}</Brief>
                      <Badge status="error" text="Rejected" />
                    </Item>
                  </Link>
                </List>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
