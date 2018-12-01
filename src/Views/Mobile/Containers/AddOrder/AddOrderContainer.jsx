import React, { Component } from "react";
import { List, Button, NavBar, Card } from "antd-mobile";
import axios from "axios";
import Cancel from "./svg/cancel.svg";
import { Redirect, Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import moment from "moment";
import { message, notification } from "antd";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const Item = List.Item;
const Brief = Item.Brief;
const warning = () => {
  message.warning(
    "Maaf Nama Barang Tidak Boleh Ada Yang Sama, Mohon Teliti barang Yang Anda beli :)"
  );
};

const notifikasiAddOrder = type => {
  notification[type]({
    message: "Berhasil Menambahkan Order",
    description: "Tunggu persetujuan dari Kabag ( ACC1 )"
  });
};


const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class AddOrderContainer extends Component {
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
    namaPembeli: "",

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
    visible: false,
    expanded: null,
    buttonEnable: false,

    dataAnggaran: [],

    dataEstimasi: [],
    dataOrder: [],
    placeOrder: false,
    dataPembeli: [],
    tanggalBeliTerakhir: "",


  };

  getDataOrder = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":{"neq":1}}}`
      )
      .then(res => {
        this.setState({
          dataOrder: res.data,

        });
        console.log(res.data);
        let namaPembeli;
        let hargaTerakhir;
        let tanggalBeliTerakhiran;
        this.state.dataOrder.map(key => {
          return (
            namaPembeli = key.people.name,
            hargaTerakhir = key.totalHarga,
            tanggalBeliTerakhiran = key.createdAt,
            this.setState({
              lastPurchaser: namaPembeli,
              lastPrice: hargaTerakhir,
              tanggalBeliTerakhir: tanggalBeliTerakhiran

            })
          )
        })
        console.log(hargaTerakhir);
        console.log(this.state.lastPurchaser);
      });

  };
  kirimData = () => {
    var date = new Date();
    var formattedDate = moment(date).format("YYYYMMDD");
    console.log(formattedDate);
    var idPeople = sessionStorage.getItem("userId");

    axios
      .post("https://purchasing-stagging.herokuapp.com/api/Orders", {
        status: this.state.status,
        note: this.state.note,
        category: this.state.category,
        divisiId: this.state.divisiId,
        bagianId: this.state.bagianId,
        orderCode: `${this.state.divisiId}/${
          this.state.bagianId
          }/${formattedDate}`,
        totalHarga: this.state.totalSemua,
        peopleId: idPeople
      })
      .then(res => {
        this.kirimDataItem(res.data.id);
        console.log(res.data);
        this.setState({
          link: true
        });
        notifikasiAddOrder("success");
      })
      .catch(err => console.log(err.response.data));
  };

  kirimDataItem = _id => {
    var datas = this.state.data;

    for (var index = 0; index < datas.length; index++) {
      console.log(_id);
      axios
        .post("https://purchasing-stagging.herokuapp.com/api/Items", {
          name: datas[index].name,
          merk: datas[index].merk,
          spec: datas[index].spec,
          lastPurchaser: this.state.lastPurchaser,
          store: datas[index].store,
          address: datas[index].address,
          telephone: datas[index].telephone,
          web: datas[index].web,
          description: datas[index].description,
          note: datas[index].note,
          lastPrice: this.state.lastPrice,
          total: datas[index].total,
          count: datas[index].count,
          unitPrice: datas[index].unitPrice,
          purchasePrice: datas[index].purchasePrice,
          status: datas[index].status,
          orderId: _id
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
            data: []
          });
        });
    }
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
        warning();
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
      total: totalHarga,
      buttonEnable: true,

    });
    console.log(this.state.data);
  };


  getDataEdit = () => {
    let userId = sessionStorage.getItem("userId");
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/People/${userId}`)
      .then(res => {
        this.setState({
          role: res.data.role,
          namaPembeli: res.data.name,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          emailVerified: res.data.emailVerified
        });
        let jabatan;

        if (this.state.role === 1) {
          jabatan = "Kepala Divisi";
        } else if (this.state.role === 2) {
          jabatan = "Kepala Bagian";
        } else if (this.state.role === 3) {
          jabatan = "Manager";
        } else if (this.state.role === 4) {
          jabatan = "Owner";
        } else if (this.state.role === 5) {
          jabatan = "Purchaser";
        }

        this.setState({
          role: jabatan
        });
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

  handleChangeTable = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  componentDidMount() {
    this.getDataEdit();
    this.getDataOrder();
  }

  render() {

    return (
      <div>
        <NavBar
          mode="dark"
          icon={
            <Link to={`/`}>
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
            padding: "25px 0px 25px 0px",
            height: "60px"
          }}
        >
          <p style={{ marginTop: "20px" }}>Pinjam Buku</p>
        </NavBar>

        <div style={{ margin: "15px" }}>
          <p style={{ textAlign: "div" }}>Masukkan Detail</p>
        </div>

        <Card
          style={{
            background: "#fff",
            padding: "35px",
            borderRadius: "0px",
            margin: "15px"
          }}
        >
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
              <MenuItem value="">
                <em>- Kelas -</em>
              </MenuItem>
              <MenuItem value="XI-RPL-1">XI-RPL-1</MenuItem>
              <MenuItem value="XI-RPL-2">XI-RPL-2</MenuItem>
              <MenuItem value="XI-RPL-3">XI-RPL-3</MenuItem>
              <MenuItem value="XI-MM-1">XI-MM-1</MenuItem>
              <MenuItem value="XI-MM-2">XI-MM-2</MenuItem>
              <MenuItem value="XI-MM-3">XI-MM-3</MenuItem>
              <MenuItem value="XI-TKJ-1">XI-TKJ-1</MenuItem>
              <MenuItem value="XI-TKJ-2">XI-TKJ-2</MenuItem>
              <MenuItem value="XI-TKJ-3">XI-TKJ-3</MenuItem>
              <MenuItem value="XI-PS-1">XI-PS-1</MenuItem>
              <MenuItem value="XI-PS-2">XI-PS-2</MenuItem>
              <MenuItem value="XI-PS-3">XI-PS-3</MenuItem>
            </Select>
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

        <center>
          <Button
            onClick={() => {
              this.pushData();
            }}
            inline
            style={{
              borderRadius: "50px",
              backgroundColor: "#ff6600",
              color: "#fff",
              width: "80%",
              margin: "20px"
            }}
          >
            Tambahkan Buku
          </Button>
        </center>

        {this.state.data.map(key => {
          return (
            <div style={{ marginBottom: "5px" }}>
              <List
                className="my-list"
              >
                <Item multipleLine extra={`Rp. ${key.total}`}>
                  <h3>{key.name}</h3>{key.store}<Brief>{`Rp. ${key.unitPrice} x ${key.count}`}</Brief>
                </Item>
              </List>
            </div>
          );
        })}

        {this.state.buttonEnable ? (
          <center>
            <Button
              onClick={() => {
                this.kirimData();
              }}
              inline
              style={{
                borderRadius: "50px",
                backgroundColor: "#ff6600",
                color: "#fff",
                width: "80%",
                margin: "20px",
                marginBottom: "70px"
              }}
            >
              Pinjam Buku
          </Button>
            {this.state.link ? <Redirect to="/my_order" /> : ""}
          </center>
        ) : (
            <center>
              <Button
                inline
                disabled
                style={{
                  borderRadius: "50px",
                  backgroundColor: "#A5A5A5",
                  color: "#fff",
                  width: "80%",
                  margin: "20px",
                  marginBottom: "70px"
                }}
              >
                Belum Ada Buku
        </Button>
            </center>)
        }

      </div>
    );
  }
}

AddOrderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddOrderContainer);