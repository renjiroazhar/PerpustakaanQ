import React, { Component } from "react";
import { Table, Select, Icon, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Option = Select.Option;

class HistoryTahunan extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    openKeys: ["sub1"],
    data: [],
    history: 0,
    totalEstimasiSemua: 0,
    totalEstimasiPerbulan: [],
    namaTahun: 0,
    loading: false,
    salah: false,
    filteredInfo: null,
    sortedInfo: null
  };

  getDataTahunan = tahunan => {
    axios
      .get(
        `http://localhost:8000/api/Items?filter={"include":"borrow","where":{"and":[{"createdAt":{"gt":"${tahunan}-1-1"}},{"createdAt":{"lt":"${tahunan}-12-31"}}],"status":1}}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
        let temp = 0;
        this.state.data.map(key => (temp += key.totalHarga));
        this.setState({
          totalEstimasiSemua: temp,
          loading: true
        });
      });
  };

  getDataTahunSekarang = () => {
    var today = new Date();
    let todayYear = today.getFullYear();
    axios
      .get(
        `http://localhost:8000/api/Items?filter={"include":"borrow","where":{"and":[{"createdAt":{"gt":"${todayYear}-1-1"}},{"createdAt":{"lt":"${todayYear}-12-31"}}],"status":"1"}}`
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res.data);
        let temp = 0;
        this.state.data.map(key => (temp += key.totalHarga));
        this.setState({
          totalEstimasiSemua: temp,
          namaTahun: todayYear
        });
      });
  };

  deleteData = _id => {
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/Orders/${_id}`)
      .then(res => {
        this.getData();
      });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  handleChangesOptionHistory = value => {
    this.setState({ history: value, namaTahun: value });
    console.log(this.state);
    this.getDataTahunan(value);
  };

  componentDidMount() {
    this.getDataTahunan();
    this.getDataTahunSekarang();
  }

  render() {
    const returned = 1;
    const rejected = 2;
    const penalty = 3;

    const columns = [
      {
        title: "Kode",
        width: 150,
        dataIndex: "borrow.borrowCode",
        key: "no",
        fixed: "left"
      },
      {
        title: "Nama siswa",
        width: 125,
        dataIndex: "borrow.student",
        key: "student",
        fixed: "left"
      },
      {
        title: "Nama Buku",
        width: 125,
        dataIndex: "bookname",
        key: "bookname",
        fixed: "left"
      },
      {
        title: "Kode Buku",
        dataIndex: "bookcode",
        key: "bookcode"
      },
      {
        title: "Penerbit",
        dataIndex: "publisher",
        key: "publisher"
      },
      {
        title: "Jumlah Buku",
        dataIndex: "count",
        key: "count"
      },
      {
        title: "NIS",
        dataIndex: "borrow.nis",
        key: "nis"
      },
      {
        title: "Kelas",
        dataIndex: "borrow.class",
        key: "class"
      },
      {
        title: "Tanggal Pinjam",
        dataIndex: "borrow.dateOfLoan",
        key: "dateOfLoan"
      },
      {
        title: "Tanggal Kembali",
        dataIndex: "borrow.dateOfReturn",
        key: "dateOfReturn"
      },
      {
        title: "Status",
        dataIndex: "borrow.status",
        key: "status",
        fixed: "right",
        render: (text, record) => {
          if (record.status === returned || record.status === 1) {
            return (
              <Button
                style={{
                  borderColor: "#00AE69",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Returned
              </Button>
            );
          } else if (record.status === rejected || record.status === 2) {
            return (
              <Button
                style={{
                  borderColor: "#f0555a",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Dibatalkan
              </Button>
            );
          } else if (record.status === penalty || record.status === 3) {
            return (
              <Button
                style={{
                  borderColor: "#f0555a",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Denda
              </Button>
            );
          } else {
            return (
              <Button
                style={{
                  borderColor: "#bababd",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Unprocessed
              </Button>
            );
          }
        }
      },

      {
        dataIndex: "edit",
        key: "edit",
        fixed: "right",
        render: (text, record) => (
          <span>
            <Link
              to={{
                pathname: `/orderdetail/${record.id}/update`,
                state: {
                  orderId: record.id,
                  orderCode: record.orderCode,
                  category: record.category,
                  status: record.status,
                  note: record.note,
                  divisiId: record.divisiId,
                  bagianId: record.bagianId,
                  totalHarga: record.totalHarga
                }
              }}
            >
              <Button
                style={{
                  backgroundColor: "#0088aaff",
                  borderColor: "transparent",
                  borderRadius: "3px",
                  color: "#fff"
                }}
                type="primary"
                size="small"
              >
                <Icon type="ellipsis" theme="twoTone" />
              </Button>
            </Link>
            <Divider type="vertical" />
          </span>
        )
      }
    ];
    return (
      <div>
        <Select
          name="history"
          defaultValue=""
          value={this.state.history}
          onChange={this.handleChangesOptionHistory}
          style={{ width: "100%" }}
        >
          <Option value={0}>
            <em>-Silakan Tentukan Tahun-</em>
          </Option>
          <Option value={2017}>2017</Option>
          <Option value={2018}>2018</Option>
          <Option value={2019}>2019</Option>
          <Option value={2020}>2020</Option>
          <Option value={2021}>2021</Option>
          <Option value={2022}>2022</Option>
          <Option value={2023}>2023</Option>
          <Option value={2024}>2024</Option>
          <Option value={2025}>2025</Option>
          <Option value={2026}>2026</Option>
          <Option value={2027}>2027</Option>
          <Option value={2028}>2028</Option>
          <Option value="">Etc...</Option>
        </Select>

        <div style={{ marginTop: "10px" }}>
          {this.state.loading ? (
            <Table
              columns={columns}
              dataSource={this.state.data}
              onChange={onChange}
              scroll={{ x: 1500 }}
            />
          ) : (
            <h1 style={{ textAlign: "center" }}>
              Loading <Icon type="loading" theme="outlined" />
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default HistoryTahunan;

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
