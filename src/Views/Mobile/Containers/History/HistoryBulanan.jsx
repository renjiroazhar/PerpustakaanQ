import React, { Component } from "react";
import { List } from "antd-mobile";
import axios from "axios";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Item = List.Item;
const Brief = Item.Brief;

export default class HistoryBulanan extends Component {
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

  getDataBulanan = (awaltanggal, akhirtanggal, bulanan, tahunan) => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"and":[{"createdAt":{"gt":"${tahunan}-${bulanan}-${awaltanggal}"}},{"createdAt":{"lt":"${tahunan}-${bulanan}-${akhirtanggal}"}}],"status":"1"}}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
      });
  };

  getDataBulanSekarang = () => {
    let today = new Date();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear();
    var d = new Date();
    var monthNames = [
      "Januari",
      "February",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    var todayMonthName = monthNames[d.getMonth()];
    console.log(todayMonthName);
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"and":[{"createdAt":{"gt":"${todayYear}-${todayMonth}-1"}},{"createdAt":{"lt":"${todayYear}-${todayMonth}-31"}}],"status":"1"}}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
      });
  };

  handleChangesOptionHistory = (e, value) => {
    let januari = [1, 31];
    let februari = [1, 29];
    let maret = [1, 31];
    let april = [1, 30];
    let mei = [1, 31];
    let juni = [1, 30];
    let july = [1, 31];
    let agustus = [1, 31];
    let september = [1, 30];
    let oktober = [1, 31];
    let november = [1, 30];
    let desember = [1, 31];

    let date = new Date();
    let currYear = date.getFullYear();
    console.log(currYear);

    if (e.target.value === "Januari") {
      this.getDataBulanan(januari[0], januari[1], 1, currYear);
      this.setState({
        namaBulan: "Januari"
      });
    } else if (e.target.value === "Februari") {
      this.getDataBulanan(februari[0], februari[1], 2, currYear);
      this.setState({
        namaBulan: "Februari"
      });
    } else if (e.target.value === "Maret") {
      this.getDataBulanan(maret[0], maret[1], 3, currYear);
      this.setState({
        namaBulan: "Maret"
      });
    } else if (e.target.value === "April") {
      this.getDataBulanan(april[0], april[1], 4, currYear);
      this.setState({
        namaBulan: "April"
      });
    } else if (e.target.value === "Mei") {
      this.getDataBulanan(mei[0], mei[1], 5, currYear);
      this.setState({
        namaBulan: "Mei"
      });
    } else if (e.target.value === "Juni") {
      this.getDataBulanan(juni[0], juni[1], 6, currYear);
      this.setState({
        namaBulan: "Juni"
      });
    } else if (e.target.value === "Juli") {
      this.getDataBulanan(july[0], july[1], 7, currYear);
      this.setState({
        namaBulan: "Juli"
      });
    } else if (e.target.value === "Agustus") {
      this.getDataBulanan(agustus[0], agustus[1], 8, currYear);
      this.setState({
        namaBulan: "Agustus"
      });
    } else if (e.target.value === "September") {
      this.getDataBulanan(september[0], september[1], 9, currYear);
      this.setState({
        namaBulan: "September"
      });
    } else if (e.target.value === "Oktober") {
      this.getDataBulanan(oktober[0], oktober[1], 10, currYear);
      this.setState({
        namaBulan: "Oktober"
      });
    } else if (e.target.value === "November") {
      this.getDataBulanan(november[0], november[1], 11, currYear);
      this.setState({
        namaBulan: "November"
      });
    } else if (e.target.value === "Desember") {
      this.getDataBulanan(desember[0], desember[1], 12, currYear);
      this.setState({
        namaBulan: "Desember"
      });
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.getDataBulanan();
    this.getDataBulanSekarang();
  }

  render() {
    return (
      <div>
        <br />
        <form>
          <h4 style={{ margin: "0px 10px 0px 10px" }}>Pilih Bulan</h4>
          <List>
            <Select
              value={this.state.history}
              onChange={this.handleChangesOptionHistory}
              inputProps={{
                name: "history",
                id: "age-simple"
              }}
              style={{ width: "100%" }}
              name="history"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Januari">Januari</MenuItem>
              <MenuItem value="Februari">Februari</MenuItem>
              <MenuItem value="Maret">Maret</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="Mei">Mei</MenuItem>
              <MenuItem value="Juni">Juni</MenuItem>
              <MenuItem value="Juli">Juli</MenuItem>
              <MenuItem value="Agustus">Agustus</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="Oktober">Oktober</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="Desember">Desember</MenuItem>
            </Select>
          </List>
          <br />
        </form>

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
                      <Badge status="default" />
                      {key.orderCode}{" "}
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
