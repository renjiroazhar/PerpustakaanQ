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
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":{"neq":1}}}`
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

  //Ganti Status 1. Purchased , 2. Waiting , 3. ACC1 , 4. Pending , 5. Rejected


  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  setTotalHargaTertinggi = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "totalHarga"
      }
    });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setTotalHargaTermurah = () => {
    this.setState({
      sortedInfo: {
        order: "ascend",
        columnKey: "totalHarga"
      }
    });
  };

  setTerlama = () => {
    this.setState({
      sortedInfo: {
        order: "ascend",
        columnKey: "createAt"
      }
    });
  };

  setTerbaru = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "createAt"
      }
    });
  };

  componentDidMount() {
    this.getDataHome();
  }

  render() {
    const purchased = 1;
    const waiting = 2;
    const acc1 = 3;
    const pending = 4;
    const rejected = 5;

    let { sortedInfo, } = this.state;
    sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: "No",
        width: 52,
        dataIndex: "no",
        key: "no",
        fixed: "left"
      },
      {
        title: "Nama siswa",
        width: 125,
        dataIndex: "student",
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
        title: "No Buku",
        dataIndex: "booknumber",
        key: "booknumber"
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
        dataIndex: "nis",
        key: "nis"
      },
      {
        title: "Kelas",
        dataIndex: "class",
        key: "class"
      },
      {
        title: "Jurusan",
        dataIndex: "vocation",
        key: "vocation"
      },
      {
        title: "Tanggal Pinjam",
        dataIndex: "dateOfLoan",
        key: "dateOfLoan"
      },
      {
        title: "Tanggal Kembali",
        dataIndex: "dateOfReturn",
        key: "dateOfReturn"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        fixed: "right",
        render: (text, record) => {
          if (record.status === purchased || record.status === 1) {
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
                Purchased
              </Button>
            );
          } else if (record.status === waiting || record.status === 2) {
            return (
              <Button
                style={{
                  borderColor: "#766ce1",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Waiting
              </Button>
            );
          } else if (record.status === acc1 || record.status === 3) {
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
                ACC1
              </Button>
            );
          } else if (record.status === pending || record.status === 4) {
            return (
              <Button
                style={{
                  borderColor: "#FEBB01",
                  borderRadius: "3px",
                  borderWidth: "2px",
                  backgroundColor: "white",
                  color: "black"
                }}
                type="primary"
                size="small"
              >
                Pending
              </Button>
            );
          } else if (record.status === rejected || record.status === 5) {
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
                Rejected
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
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Anda yakin?"
              onConfirm={() => {
                this.statusRejected(record.id);

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
                this.statusPending(record.id);
              }}

              okText="Yes"
              cancelText="No"
            >
              <Button

                style={{
                  backgroundColor: "#FEBB01",
                  borderColor: "transparent",
                  borderRadius: "3px"
                }}
                type="primary"
                size="small"
              >
                <Icon type="clock-circle" theme="twoTone" />
              </Button>

            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="Anda yakin?"
              onConfirm={() => {
                this.statusAcc1Purchased(record.id);
              }}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  backgroundColor: "#00ae69",
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