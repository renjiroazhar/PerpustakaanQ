import React, { Component } from "react";
import { Icon, Divider, Button, Table, Input, Badge } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";
import TextField from "@material-ui/core/TextField";

const { TextArea } = Input;
const InputGroup = Input.Group;
class DetailOrder extends Component {
  state = {
    dataSource: [], // Check here to configure the default column
    data: [],
    orderDetail: []
  };

  getDataById = () => {
    axios
      .get(
        `http://localhost:8000/api/Items/${this.props.match.params.id}?filter={"include":"borrow"}`
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

  gantiData = _id => {
    axios
      .patch(`http://localhost:8000/api/Items/${_id}`, {
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
    axios.delete(`http://localhost:8000/api/Items/${_id}`).then(res => {
      this.setState({
        link: true
      });
      this.getDataById();
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
    var formattednum_totalSemua = Number(totalSemuaHarga).toLocaleString(
      "in-ID",
      {
        style: "currency",
        currency: "IDR"
      }
    );

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
            <Button
              disabled
              style={{
                backgroundColor: "#A5A5A5",
                borderColor: "transparent",
                borderRadius: "3px"
              }}
              type="primary"
              size="small"
            >
              <Icon type="delete" theme="outlined" />
            </Button>
            <Divider type="vertical" />

            <Button
              disabled
              style={{
                backgroundColor: "#A5A5A5",
                borderColor: "transparent",
                borderRadius: "3px"
              }}
              type="primary"
              size="small"
            >
              <Icon type="edit" theme="outlined" />
            </Button>

            <Divider type="vertical" />
          </span>
        )
      }
    ];

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
        </div>

        <div>
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
                <h3 type="primary" size="small">
                  <Badge status="success" /> Purchased
                </h3>
              </InputGroup>
            </fieldset>
          </form>
        </div>

        <div style={{ marginTop: "10px" }}>
          {this.state.loading ? (
            // <Table
            //   columns={columns}
            //   dataSource={this.state.orderDetail}
            //   scroll={{ x: 1500 }}
            // />
            ""
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

export default DetailOrder;
