import React, { Component } from "react";
import { Row, Col } from "antd";
import { Input, Select, Button } from "antd";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;

class OrderEdit extends Component {
  state = {
    dataSource: [], // Check here to configure the default column
    loading: false,
    status: 0,
    orderCode: "",
    category: "",
    note: "",
    id: "",
    divisiId: "",
    bagianId: "",

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
    orderId: "",
    data: [],
    key: 0,
    totalSemua: 0,

    link: false
  };

  getDataById = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Items/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        var datas = res.data;
        console.log(res, ">>>>ini res id");
        this.setState({
          name: datas.name,
          note: datas.note,
          unitPrice: datas.unitPrice,
          count: datas.count,
          total: datas.total,
          merk: datas.merk,
          spec: datas.spec,
          lastPurchaser: datas.lastPurchaser,
          store: datas.store,
          address: datas.address,
          telephone: datas.telephone,
          web: datas.web,
          description: datas.description,
          lastPrice: datas.lastPrice,
          purchasePrice: datas.purchasePrice,
          status: datas.status,
          data : res.data
        });
      });
  };

  editData = _id => {
    axios
      .patch(`https://purchasing-stagging.herokuapp.com/api/Items/${_id}`, {
        name: this.state.name,
        merk: this.state.merk,
        spec: this.state.spec,
        lastPurchaser: this.state.lastPurchaser,
        store: this.state.store,
        address: this.state.address,
        telephone: this.state.telephone,
        web: this.state.web,
        description: this.state.description,
        note: this.state.note,
        lastPrice: this.state.lastPrice,
        total: this.state.total,
        count: this.state.count,
        unitPrice: this.state.unitPrice,
        purchasePrice: this.state.purchasePrice,
        status: this.state.status
      })
      .then(response => {
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

  goBack = () => {
    this.props.history.goBack();
  }

  handleChangesOptionCategory = value => {
    this.setState({ category: value });
  };

  componentDidMount() {
    this.getDataById();
    console.log(this.props.location.state.orderId);
  }

  render() {
    let totalHarga = this.state.total;
    var formattednum_totalHarga = Number(totalHarga).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    return (
      <div>
        <h2 style={{ textDecoration: "underline" }}>
          Edit Data Barang yang Dibeli
        </h2>

        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <h2 style={{ textDecorationStyle: "bold" }} align="left">
            Detail Pesanan
          </h2>
          <br />
          <Col span={6} style={{ marginRight: "40px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Kategori
            </h5>
            <Select
              defaultValue="Kategori"
              name="category"
              onChange={this.handleChangesOptionCategory}
              value={this.state.category}
              style={{ width: "400px" }}
            >
              <Option value="Elektronik">Elektronik</Option>
              <Option value="Jasa/Tenaga borong">Jasa/Tenaga borong</Option>
              <Option value="Material Bangunan">Material Bangunan</Option>
              <Option value="Obat-obatan">Obat-obatan</Option>
              <Option value="Pakan ternak">Pakan ternak</Option>
              <Option value="Peralatan kerja">Peralatan kerja</Option>
              <Option value="Perlengkapan satwa">Perlengkapan satwa</Option>
              <Option value="Sparepart">Sparepart</Option>
              <Option value="Service/Inventaris">Service/Inventaris</Option>
              <Option value="Lain-lain">Lain-lain</Option>
            </Select>
          </Col>
          <Col span={6} style={{ width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nama Toko
            </h5>
            <Input
              name="store"
              value={this.state.store}
              onChange={this.handleChange}
              placeholder="Nama Toko"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nama Barang
            </h5>
            <Input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              placeholder="Nama Barang"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Alamat Toko
            </h5>
            <Input
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              placeholder="Alamat Toko"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Merk
            </h5>
            <Input
              name="merk"
              value={this.state.merk}
              onChange={this.handleChange}
              required
              placeholder="Merk"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nomor Telepon
            </h5>
            <Input
              name="telephone"
              value={this.state.telephone}
              onChange={this.handleChange}
              placeholder="Nomor Telepon"
              type="number"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Spesifikasi
            </h5>
            <Input
              name="spec"
              value={this.state.spec}
              onChange={this.handleChange}
              required
              placeholder="Spesifikasi"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Website
            </h5>
            <Input
              name="web"
              value={this.state.web}
              onChange={this.handleChange}
              placeholder="Website"
            />
          </Col>
          <Col
            span={5}
            style={{ marginRight: "15px", width: "30%", marginTop: "20px" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Harga
            </h5>
            <Input
              style={{ width: "200px" }}
              
              name="unitPrice"
              value={this.state.unitPrice}
              onChange={this.handleChange}
              placeholder="Harga"
              type="number"
            />
          </Col>
          <Col span={1} style={{ width: "20%" }}>
            <h5
              align="left"
              style={{ marginBottom: "10px", marginTop: "20px" }}
            >
              Jumlah
            </h5>
            <Input
              name="count"
              value={this.state.count}
              onChange={this.handleChange}
              placeholder="Jumlah"
              style={{ width: "100px" }}
              type="number"
            />
          </Col>
          <Col span={6} style={{ width: "47%" }}>
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
          </Col>
          <Col span={3} style={{ marginTop: "20px", width: "25%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Total Harga
            </h5>
            <Input
              name="total"
              value={this.state.total}
              onChange={this.handleChange}
              placeholder="Total Harga"
              type="number"
            />
          </Col>
        </InputGroup>

        <br />
        <div style={{ background: "#f7f7f7", padding: "35px" }}>
          <Row>
            <Col span={4}>
              <div>
                <h2 marginRight="15px">Total Harga : </h2>
              </div>
            </Col>
            <Col span={4}>
              <h2 style={{ color: "#00ae69" }}>{formattednum_totalHarga}</h2>
              <br />
            </Col>
          </Row>

          <Row>
            <Link to={`/orderdetail/${this.state.data.orderId}/update`}>
            <Button
              style={{
                backgroundColor: "#f0555a",
                width: "200px",
                height: "45px",
                borderColor: "transparent",
                fontWeight: "bold",
                fontSize: "13px",
                float: "left"
              }}
              type="primary"
              size="large"
            >
              BATAL
            </Button>
            </Link>

            <Button
              style={{
                backgroundColor: "#00ae69",
                width: "250px",
                height: "45px",
                borderColor: "transparent",
                fontWeight: "bold",
                fontSize: "13px",
                marginLeft: "255px",
                float: "right"
              }}
              type="primary"
              size="large"
              onClick={() => {
                this.editData(this.props.match.params.id);
                
              }}
            >
              SIMPAN PERUBAHAN
            </Button>
          </Row>
        </div>
        <br />
        {this.state.link ? <Redirect to={`/orderdetail/${this.state.data.orderId}/update`} /> : ""}
      </div>
    );
  }
}

export default OrderEdit;
