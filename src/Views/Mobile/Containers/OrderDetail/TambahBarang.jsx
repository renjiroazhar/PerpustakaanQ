import React, { Component } from "react";
import { List, Button, NavBar, Card, } from "antd-mobile";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Cancel from "./svg/cancel.svg";


class TambahBarang extends Component {
  state = {
    hasError: false,
    value: "",
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

    link: false,

    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: ["2013", "?"],
    visible: false
  };

  kirimDataItem = _id => {
    // var datas = this.state.data;
    // for (var index = 0; index < datas.length; index++) {
    //   console.log(_id);
    axios
      .post("https://purchasing-stagging.herokuapp.com/api/Items", {
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
        status: this.state.status,
        orderId: this.props.match.params.id
      })
      .then(res => {
        this.setState({
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
          status: 0,
          orderId: "",
          totalSemua: 0,
          link: true
        });
      });

  };

  deleteData = e => {
    var array = [...this.state.data]; // make a separate copy of the array
    var index = array.findIndex(item => item.name === e.name);
    console.log(array);
    console.log(index);
    console.log(array[index]);
    console.log(e);
    var totalAfter = this.state.totalSemua - e.total;
    array.splice(index, 1);
    this.setState({ data: array, totalSemua: totalAfter });
  };

  pushData = () => {
    const data = {
      lastPurchaser: this.state.lastPurchaser,
      name: this.state.name,
      note: this.state.note,
      unitPrice: this.state.unitPrice,
      count: this.state.count,
      total: this.state.total,
      merk: this.state.merk,
      spec: this.state.spec,

      store: this.state.store,
      address: this.state.address,
      telephone: this.state.telephone,
      web: this.state.web,
      description: this.state.description,
      lastPrice: this.state.lastPrice,
      purchasePrice: this.state.purchasePrice,
      status: this.state.status
    };
    var array = [...this.state.data];
    var index = array.findIndex(item => item.name === data.name);
    if (array.length > 0) {
      if (index > -1) {
        alert(
          "Maaf Nama Barang Tidak Boleh Ada Yang Sama, Mohon Teliti barang Yang Anda beli :)"
        );
        return;
      }
    }

    console.log(data);
    var totalSemua1 = Number(this.state.totalSemua) + Number(data.total);
    var totalHarga = this.state.count * this.state.unitPrice;
    var newData = this.state.data.concat(data);
    console.log(newData);

    this.setState({
      data: newData,
      totalSemua: totalSemua1,
      total: totalHarga
    });
    console.log(this.state.data);
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

  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          icon={
            <Link to={`/orderdetail/${this.props.match.params.id}/update`}>
              <img
                src={Cancel}
                height="20px"
                width="20px"
                alt="Currency free icon"
                title="Currency free icon"
              />
            </Link>
          }
          onClick={() => console.log("")}
          style={{
            backgroundColor: "#0088aaff",
            padding: "25px 0px 25px 0px"
          }}
        >
          <p style={{ marginTop: "20px" }}>Tambah Barang</p>
        </NavBar>

        <Card
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "0px",
            margin: "15px"
          }}
        >
          <List>
            <InputLabel htmlFor="demo-controlled-open-select">
              Kategori
            </InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.category}
              onChange={this.handleChange}
              inputProps={{
                name: "category",
                id: "demo-controlled-open-select"
              }}
              style={{ width: "100%" }}
              name="category"
            >
              <MenuItem value="" disabled>
                <em>- Kategori -</em>
              </MenuItem>
              <MenuItem value="Elektronik">Elektronik</MenuItem>
              <MenuItem value="Jasa/Tenaga borong">Jasa/Tenaga borong</MenuItem>
              <MenuItem value="Material Bangunan">Material Bangunan</MenuItem>
              <MenuItem value="Obat-obatan">Obat-obatan</MenuItem>
              <MenuItem value="Pakan ternak">Pakan ternak</MenuItem>
              <MenuItem value="Peralatan kerja">Peralatan kerja</MenuItem>
              <MenuItem value="Perlengkapan satwa">Perlengkapan satwa</MenuItem>
              <MenuItem value="Sparepart">Sparepart</MenuItem>
              <MenuItem value="Service/Inventaris">Service/Inventaris</MenuItem>
              <MenuItem value="Lain-lain">Lain-lain</MenuItem>
            </Select>
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Nama Barang"
              name="name"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Merk"
              name="merk"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.merk}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Spesifikasi"
              name="spec"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.spec}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Harga Satuan"
              name="unitPrice"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.unitPrice}
              onChange={this.handleChange}
              margin="normal"
              type="number"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Jumlah"
              name="count"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.count}
              onChange={this.handleChange}
              margin="normal"
              type="number"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Total"
              name="total"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.total}
              onChange={this.handleChange}
              margin="normal"
              type="number"
            />
          </List>
        </Card>

        <Card
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "0px",
            margin: "15px 15px 0px 15px"
          }}
        >
          <List>
            <TextField
              id="standard-name"
              label="Nama Toko"
              name="store"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.store}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Alamat Toko"
              name="address"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.address}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="No. Telepon"
              name="telephone"
              width="100%"
              type="number"
              style={{ width: "100%" }}
              value={this.state.telephone}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Website"
              name="web"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.web}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
          <List>
            <TextField
              id="standard-name"
              label="Catatan"
              name="note"
              width="100%"
              style={{ width: "100%" }}
              value={this.state.note}
              onChange={this.handleChange}
              margin="normal"
            />
          </List>
        </Card>


        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={() => {
              this.kirimDataItem();
            }}
            inline
            style={{
              borderRadius: "50px",
              backgroundColor: "#ff6600",
              color: "#fff",
              width: "90%",
              margin: "20px 0px 60px 0px"
            }}
          >
            Tambah Barang
        </Button>
          {this.state.link ? <Redirect to={`/orderdetail/${this.props.match.params.id}/update`} /> : ""}
        </div>
      </div>
    );
  }
}

export default TambahBarang;