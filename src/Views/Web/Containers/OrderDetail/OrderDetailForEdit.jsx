import React, { Component } from "react";
import {
  Icon,
  Divider,
  Button,
  Table,
  Row,
  Col,
  Input,
  Popconfirm,
  Card,
  Badge
} from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";
import TextField from "@material-ui/core/TextField";

const { TextArea } = Input;
const InputGroup = Input.Group;
class OrderDetailForEdit extends Component {
  state = {
    dataSource: [], // Check here to configure the default column
    loading: false,
    status: 0,
    orderCode: "",
    note: "",
    id: "",
    divisiId: "",
    bagianId: "",

    dataAll: [],
    bagian: "",
    divisi: "",

    name: "",
    merk: "",
    spec: "",
    lastPurchaser: "",
    store: "",
    address: "",
    telephone: "",
    web: "",
    description: "",
    
    lastPrice: 0,
    total: 0,
    count: 0,
    unitPrice: 0,
    purchasePrice: 0,
    
    
    link: false,
    orderId: "",
    data: [],
    orderDetail: [],
    dataOrderId: [],
    key: 0,
    totalSemua: 0,
    enableEdit: false,

    category: "",
    
    totalHarga: 0,
    namaPembeli: ""
  };

  getDataById = () => {
    axios
      .get(
        `http://localhost:8000/api/Borrows/${
          this.props.match.params.id
        }/items`
      )
      .then(res => {
        var datas = res.data;
        console.log(res, ">>>>ini res id");
        this.setState({
          orderDetail: datas,
          loading: true
        });
      });
  };

  getDataOrderId = () => {
    axios
      .get(
        `http://localhost:8000/api/Borrows/${
          this.props.match.params.id
        }/?filter={"include":"items"}`
      )
      .then(res => {
        var datas = res.data;
        console.log(res, ">>>>ini res id");
        console.log(this.state.dataOrderId.id);
      });
  };

  gantiData = _id => {
    axios
      .patch(`http://localhost:8000/api/Borrows/${_id}`, {
        note: this.state.note,
        category: this.state.category
      })
      .then(res => {
        this.setState({
          enableEdit: false
        });
      })
      .catch(err => console.log(err.response.data));
  };

  deleteData = _id => {
    this.deleteAllItem(this.props.match.params.id);
    axios
      .delete(`http://localhost:8000/api/Borrows/${_id}`)
      .then(res => {
        this.setState({
          link: true
        });
        console.log(this.state.dataOrderId.id);
      });
  };

  deleteAllItem = _id => {
    axios
      .delete(
        `http://localhost:8000/api/Borrows/${_id}/Items`
      )
      .then(res => {
        console.log("berhasil menghapus order");
      });
  };

  deleteDataItem = _id => {
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/Items/${_id}`)
      .then(res => {
        this.getDataById();
        this.getDataOrderId();
      });
  };

  handleChange = e => {
    if (e.target.name === "unitPrice") {
      this.setState({
        total: this.state.count * e.target.value
      });
    } else if (e.target.name === "count") {
      this.setState({
        total: this.state.unitPrice * e.target.value
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  handleChangesOptionCategory = value => {
    this.setState({ category: value });
  };

  handleChangesOptionDivisi = value => {
    this.setState({ divisiId: value });
  };

  handleChangesOptionBagian = value => {
    this.setState({ bagianId: value });
  };

  componentDidMount() {
    this.getDataById();
    this.getDataOrderId();
    console.log(this.state.orderDetail);
    console.log(this.state.orderCode);
  }

  Inputs = props => {
    return (
      <div>
        <Input
          value="Disabled"
          disabled
          inputProps={{
            "aria-label": "Description"
          }}
        />
      </div>
    );
  };

  render() {
    let totalSemuaHarga = this.state.totalHarga;
    var formattednum_totalSemua = Number(totalSemuaHarga).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });
    
    const columns = [
      {
        title: "Nama Barang",
        width: 125,
        dataIndex: "name",
        key: "name",
        fixed: "left"
      },
      {
        title: "Merk",
        dataIndex: "merk",
        key: "merk"
      },
      {
        title: "Spesifikasi",
        dataIndex: "spec",
        key: "spec"
      },
      {
        title: "Toko",
        dataIndex: "store",
        key: "store"
      },
      {
        title: "Alamat Toko",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "Catatan",
        dataIndex: "note",
        key: "note"
      },
      {
        title: "Harga Satuan",
        dataIndex: "unitPrice",
        key: "unitPrice"
      },
      {
        title: "Jumlah",
        dataIndex: "count",
        key: "count"
      },
      {
        title: "Total Harga Item",
        dataIndex: "total",
        key: "total"
      },
      {
        title: "Telepon",
        dataIndex: "telephone",
        key: "telephone"
      },
      {
        title: "Deskripsi",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Website",
        dataIndex: "web",
        key: "web"
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "150px",
        fixed: "right",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Anda yakin ?"
              onConfirm={() => {
                this.deleteDataItem(record.id);
              }}
              onCancel={this.cancel}
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
                
                  <Icon type="delete" theme="outlined" />
                
              </Button>
            </Popconfirm>
            <Divider type="vertical" />

            <Link
              to={{
                pathname: `/orderdetail/update/${record.id}`,
                state: {
                  orderId: this.state.id,
                  orderCode: this.state.orderCode
                }
              }}
            >
              <Button
                style={{
                  backgroundColor: "#0088aaff",
                  borderColor: "transparent",
                  borderRadius: "3px"
                }}
                type="primary"
                size="small"
              >
                <Icon type="edit" theme="outlined" />
              </Button>
            </Link>
            <Divider type="vertical" />
          </span>
        )
      }
    ];

    let button;
    if (this.state.dataOrderId.status === 1) {
      button = (
        <div>
          <h3 type="primary" size="small">
          <Badge status="success" /> Purchased
          </h3>
        </div>
      );
    } else if (this.state.dataOrderId.status === 2) {
      button = (
        <div>
          <h3 type="primary" size="small">
          <Badge status="processing" /> Waiting
          </h3>
        </div>
      );
    } else if (this.state.dataOrderId.status === 3) {
      button = (
        <div>
          {" "}
          <h3 type="primary" size="small">
          <Badge status="success" /> ACC1
          </h3>
        </div>
      );
    } else if (this.state.dataOrderId.status === 4) {
      button = (
        <div>
          <h3 type="primary" size="small">
          <Badge status="warning" /> Pending
          </h3>
        </div>
      );
    } else if (this.state.dataOrderId.status === 5) {
      button = (
        <div>
          <h3 type="primary" size="small">
          <Badge status="error" /> Rejected
          </h3>
        </div>
      );
    } else if(this.state.dataOrderId.status === 0) {
      button = (
        <div>
          <h3 type="primary" size="small">
          <Badge status="default" /> Unprocessed
          </h3>
        </div>
      );
    }

    return (
      <div>
        <div>
          <h1 style={{ marginLeft: "15px" }}>
            Detail Order :{" "}
            <TextField
              id="standard-name"
              label="Total Harga"
              name="totalHarga"
              value={formattednum_totalSemua}
              margin="normal"
              style={{ color: "#00ae69" }}
            />{" "}
          </h1>

          <Row>
            <Card
              style={{
                margin: "15px",
                backgroundColor: "#f7f7f7",
                border: "0px"
              }}
            >
              <Col span={6}>
                <Link
                  to={{
                    pathname: `/orderdetail/update/addnewbarang/${
                      this.state.dataOrderId.id
                    }`,
                    state: {
                      orderId: this.state.dataOrderId.id,
                      orderCode: this.state.orderCode
                    }
                  }}
                >
                  <Button
                    style={{
                      width: "100%",
                      borderColor: "transparent",
                      borderRadius: "3px",
                      backgroundColor: "#0088aaff",
                      color: "#fff"
                    }}
                    type="primary"
                    icon="plus"
                    size="large"
                  >
                    Tambah Barang
                  </Button>
                </Link>
              </Col>
              <Col span={12}>
                <h3 style={{ textAlign: "center" }}>
                  {`#${this.state.dataOrderId.orderCode}`}
                </h3>
              </Col>
              <Col span={6}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "#f0555a",
                    borderColor: "transparent",
                    borderRadius: "3px",
                    marginRight: "15px"
                  }}
                  type="primary"
                  icon=""
                  size="large"
                  onClick={() => {
                    this.deleteData(this.props.match.params.id);
                  }}
                >
                  Hapus Order
                </Button>
              </Col>
            </Card>
          </Row>
        </div>

        {this.state.enableEdit ? (
          <div>
            {" "}
            <Row>
              <h3 style={{ float: "left" }}>
                {`#${this.props.location.state.orderCode}`}
              </h3>
              <Button
                style={{
                  backgroundColor: "#f0555a",
                  borderColor: "transparent",
                  borderRadius: "3px",
                  float: "right"
                }}
                type="primary"
                size="omitted"
                onClick={() => {
                  this.setState({ enableEdit: false });
                }}
              >
                Batal <Icon type="close" theme="outlined" />
              </Button>
            </Row>
            <InputGroup
              style={{ background: "#f7f7f7", padding: "35px" }}
              size="large"
            >
              <h5
                align="left"
                style={{ marginBottom: "10px", marginTop: "20px" }}
              >
                Nama Pembeli
              </h5>
              <Input
                name="namaPembeli"
                disabled
                value={this.state.namaPembeli}
                placeholder="Nama Pembeli"
                style={{ width: "100%" }}
              />
              <br/>
              <br />
              <h5
                align="left"
                style={{ marginBottom: "10px", marginTop: "20px" }}
              >
                Catatan
              </h5>
              <TextArea
                name="note"
                value={this.state.note}
                onChange={this.handleChange}
                placeholder="Catatan"
              />
              <br />
              <br />
              <h5
                align="left"
                style={{ marginBottom: "10px", marginTop: "20px" }}
              >
                Status
              </h5>
              {button}
              <br />
              <Button
                style={{
                  backgroundColor: "#00ae69",
                  width: "250px",
                  height: "45px",
                  borderColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "13px",
                  marginTop: "25px",
                  float: "right"
                }}
                type="primary"
                onClick={() => {
                  this.gantiData(this.props.match.params.id);
                }}
              >
                SIMPAN PERUBAHAN
              </Button>
            </InputGroup>
          </div>
        ) : (
          <div>
            <Row>
              <Button
                style={{
                  backgroundColor: "#0088aaff",
                  borderColor: "transparent",
                  borderRadius: "3px",
                  float: "right"
                }}
                type="primary"
                size="omitted"
                onClick={() => {
                  this.setState({ enableEdit: true });
                }}
              >
                Edit <Icon type="form" theme="outlined" />
              </Button>
            </Row>
            <form>
              <fieldset disabled>
                <InputGroup
                  style={{ background: "#f7f7f7", padding: "35px" }}
                  size="large"
                >
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Nama Pembeli
                  </h5>
                  <Input
                    name="namaPembeli"
                    disabled
                    value={this.state.namaPembeli}
                    placeholder="Nama Pembeli"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Catatan
                  </h5>
                  <TextArea
                    disabled
                    name="note"
                    value={this.state.note}
                    onChange={this.handleChange}
                    className
                    placeholder="Catatan"
                    style={{ color: "rgba(0, 0, 0, .25);" }}
                  />
                  <br />
                  <br />
                  <h5
                align="left"
                style={{ marginBottom: "10px", marginTop: "20px" }}
              >
                Status
              </h5>
              {button}
              <br/>
                </InputGroup>
              </fieldset>
            </form>
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          {this.state.loading ? (
            <Table
              columns={columns}
              dataSource={this.state.orderDetail}
              scroll={{ x: 1500 }}
            />
          ) : (
            <h1 style={{ textAlign: "center" }}>
              Loading <Icon type="loading" theme="outlined" />
            </h1>
          )}
          {this.state.link ? <Redirect to="/" /> : ""}
        </div>
      </div>
    );
  }
}

export default OrderDetailForEdit;
