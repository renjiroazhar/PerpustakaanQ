import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Icon,
  Button,
  Divider,
  Select,
  Popconfirm,
 
} from "antd";
import logoCoin from "./svg/currency.svg";
import logoCard from "./svg/credit-card.svg";
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
    dataAnggaran: [],
    dataEstimasi: [],
    dataUser: [],
    filter: "",
    visible: false,
    totalHarga: 0,
    buttonEnable : false,
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

  getDataAnggaran = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalAnggaran"
      )
      .then(res => {
        this.setState({
          dataAnggaran: res.data
        });
        console.log(res);
      });
  };

  getTotalEstimasi = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalEstimasi"
      )
      .then(res => {
        this.setState({
          dataEstimasi: res.data
        });
      });
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
    this.getDataAnggaran();
    this.getTotalEstimasi();
  }

  render() {
    const purchased = 1;
    const waiting = 2;
    const acc1 = 3;
    const pending = 4;
    const rejected = 5;

    let estimasiSemua = this.state.dataEstimasi.totalEstimasi;
    var formattednum_estimasi = Number(estimasiSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    let anggaranSemua = this.state.dataAnggaran.totalAnggaran;
    var formated_num = Number(anggaranSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });


    let { sortedInfo, } = this.state;
    sortedInfo = sortedInfo || {};
  
    const columns = [
      {
        title: "Kode Order",
        dataIndex: "orderCode",
        key: "orderCode",
        filters: [
          {
            text: "Gudang",
            value: "Gudang"
          },
          {
            text: "Gudang Ikan",
            value: "Gudang Ikan"
          },
          {
            text: "Kebersihan",
            value: "Kebersihan"
          },
          {
            text: "Outbond",
            value: "Outbond"
          },
          {
            text: "Pertamanan",
            value: "Pertamanan"
          },
          {
            text: "Rekreasi",
            value: "Rekreasi"
          },
          {
            text: "Restoran",
            value: "Restoran"
          },
          {
            text: "Technical Support",
            value: "Technical Support"
          },
          {
            text: "Security",
            value: "Security"
          }
        ],
        filterMultiple: true,
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.orderCode.indexOf(value) === 0,
        sorter: (a, b) => a.orderCode.length - b.orderCode.length
      },
      {
        title: "Pemesan",
        dataIndex: "people.name",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.name - b.name
      },
      {
        title: "Total",
        dataIndex: "totalHarga",
        render: (text, record) => {
          let totalharga = record.totalHarga;
          var formated_numtotalharga = Number(totalharga).toLocaleString("in-ID", {
            style: "currency",
            currency: "IDR"
          });

          return (formated_numtotalharga)
        },
        sorter: (a, b) => a.totalHarga - b.totalHarga,
        sortOrder: sortedInfo.columnKey === "totalHarga" && sortedInfo.order
      },
      {
        title: "Catatan",
        dataIndex: "note"
      },
      {
        key: "createAt",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.createAt - b.createAt,
        sortOrder: sortedInfo.columnKey === "createAt" && sortedInfo.order
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
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
                  backgroundColor: "#872ef5",
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
        <Row gutter={16}>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: "#00ae69",
                height: "100px",
                borderRadius: "7px"
              }}
            >
              <Row style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <img
                    src={logoCoin}
                    height="50px"
                    width="50px"
                    alt="Currency free icon"
                    title="Currency free icon"
                  />
                </Col>
                <Col span={16}>
                  <h4 style={{ color: "white" }} align="right">
                    Sisa Budget
                  </h4>
                  <h2 style={{ color: "white" }} align="right">
                    {formated_num}
                  </h2>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: "#f0555a",
                height: "100px",
                borderRadius: "7px"
              }}
            >
              <Row style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <img
                    src={logoCard}
                    height="50px"
                    width="50px"
                    alt="Currency free icon"
                    title="Currency free icon"
                  />
                </Col>
                <Col span={16}>
                  <h4 style={{ color: "white" }} align="right">
                    Total Estimasi
                  </h4>
                  <h2 style={{ color: "white" }} align="right">
                    {formattednum_estimasi}
                  </h2>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />

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
                All Order  <Icon type="down" />
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
