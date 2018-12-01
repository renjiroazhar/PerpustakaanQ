import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Icon,
  Button,
  Divider,
  Select,
  Popconfirm,

} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";


const Option = Select.Option;

class HomeContainer extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    openKeys: ["sub1"],
    status: 0,
    data: [],
    name: "",
    merk: "",
    spec: "",
    lastPurchaser: "",
    store: "",
    address: "",
    telephone: "",
    web: "",
    description: "",
    note: "",
    lastPrice: 0,
    total: 0,
    count: 0,
    unitPrice: 0,
    purchasePrice: 0,
    id: "",
    orderId: "",
    dataUser: [],
    filter: "",
    visible: false,
    totalHarga: 0,
    buttonEnable: false,
    visiblePending: false,
    filteredInfo: null,
    sortedInfo: null
  };


  getDataHome = () => {
    axios
      .get(
        `http://localhost:8000/api/Items?filter={"include":"borrow","where":{"status":{"neq":1}}}`
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
    const returned = 1;
    const penalty = 2;

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
                Dikembalikan
              </Button>
            );
          } else if (record.status === penalty || record.status === 2) {
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
          }
          else {
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
                Dipinjam
              </Button>
            );
          }
        }
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Anda yakin?"
              onConfirm={() => {
                this.statusPenalty(record.id);

              }}

              okText="Yes"
              cancelText="No"
            >
              <Button

                style={{
                  backgroundColor: "#f0555a",
                  borderColor: "transparent",
                  borderRadius: "3px"
                }}
                type="primary"
                size="small"
              >
                <Icon type="minus-circle" theme="outlined" />
              </Button>

            </Popconfirm>

            <Divider type="vertical" />
            <Popconfirm
              title="Anda yakin?"
              onConfirm={() => {
                this.statusReturned(record.id);
              }}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  backgroundColor: "#ff6600",
                  borderColor: "transparent",
                  borderRadius: "3px"
                }}
                type="primary"
                size="small"
              >
                <Icon type="check" theme="outlined" />
              </Button>
            </Popconfirm>
          </span>
        )
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
                  backgroundColor: "#ff6600",
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
        <Row>
          <Col span={3}>
            <Select
              name="filter"
              defaultValue=""
              value={this.state.filter}
              onChange={this.handleChangeHistoryFilter}
              style={{ width: "250px" }}
              size="large"
              onDeselect={this.clearAll}
            >
              <Option value="">
                All Order
              </Option>
              <Option value="1">Bagian</Option>
              <Option value="2">Divisi</Option>
              <Option value="3">Kelompok Order</Option>
              <Option value="4">Nama</Option>
              <Option value="5">Terlama</Option>
              <Option value="6">Terbaru</Option>
              <Option value="7">Termahal</Option>
              <Option value="8">Termurah</Option>
            </Select>
          </Col>
        </Row>
        <br />
        {this.state.loading ? (
          <Table
            columns={columns}
            dataSource={this.state.data}
            onChange={this.handleChange}
            scroll={{ x: 1500 }}
          />
        ) : (
            <h1 style={{ textAlign: "center" }}>
              Loading <Icon type="loading" theme="outlined" />
            </h1>
          )}
      </div>
    );
  }
}

export default HomeContainer;