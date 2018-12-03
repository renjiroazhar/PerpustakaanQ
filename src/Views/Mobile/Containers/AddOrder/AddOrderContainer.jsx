import React, { Component } from "react";
import { List, Button, NavBar, Card } from "antd-mobile";
import axios from "axios";
import Cancel from "./svg/cancel.svg";
import { Redirect, Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
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
    dataSource: [], // Check here to configure the default column
    loading: false,
    student: "",
    nis: 0,
    class: "",
    status: 0,
    borrowCode: "",
    dateOfLoan: "",
    dateOfReturn: "",

    bookName: "",
    bookcode: "",
    publisher: "",
    publicationYear: 0,
    count: 0,
    note: "",
    borrowId: "",
    data: [],

    key: 0,
    totalSemua: 0,
    dataAnggaran: [],
    namaPeminjam: "",
    dataEstimasi: [],
    dataOrder: [],
    placeOrder: false,
    dataPeminjam: [],
    tanggalBeliTerakhir: "",

    link: false
  };

  kirimData = () => {
    var date = new Date();
    var tanggal = date.getDay();
    var bulan = date.getMonth();
    var tahun = date.getFullYear();
    const loanDate = `${tahun}-${bulan}-${tanggal}`;
    const returnDate = `${tahun}-${bulan}-${tanggal + 3}`;

    axios
      .post("http://localhost:8000/api/Borrows", {
        status: 0,
        nis: this.state.nis,
        note: this.state.note,
        student: this.state.student,
        class: this.state.class,
        dateOfLoan: loanDate,
        dateOfReturn: returnDate,
        borrowCode: `${this.state.nis}/${loanDate}`
      })
      .then(res => {
        this.kirimDataItem(res.data.id);
        console.log(res.data);
        this.setState({
          link: true
        });
        notifikasiAddOrder("success");
      })
      .catch(err => console.log(err.response));
  };

  kirimDataItem = _id => {
    var datas = this.state.data;

    for (var index = 0; index < datas.length; index++) {
      console.log(_id);
      axios
        .post("http://localhost:8000/api/Items", {
          status: this.state.status,
          bookname: datas[index].bookName,
          bookcode: datas[index].bookcode,
          publisher: datas[index].publisher,
          publicationYear: datas[index].publicationYear,
          count: datas[index].count,
          borrowId: _id
        })
        .then(res => {
          this.setState({
            bookname: "",
            bookcode: "",
            publisher: "",
            publicationYear: 0,
            count: 0,
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
      bookName: this.state.bookName,
      publisher: this.state.publisher,
      bookcode: this.state.bookcode,
      publicationYear: this.state.publicationYear,
      count: this.state.count,
      note: this.state.note
    };
    var array = [...this.state.data];
    var index = array.findIndex(item => item.bookcode === data.bookcode);
    if (array.length > 0) {
      if (index > -1) {
        warning();
        return;
      }
    }

    console.log(data);
    var newData = this.state.data.concat(data);
    console.log(newData);

    this.setState({
      data: newData,
      placeOrder: true
    });
    console.log(this.state.data);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  handleChangesOptionClass = value => {
    this.setState({ class: value });
  };


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
            height: "60px",
            width: "100%",
            position: "fixed",
            top: 0,
            zIndex: 100,
          }}
        >
          <p style={{ marginTop: "20px" }}>Pinjam Buku</p>
        </NavBar>

        <div style={{ marginTop: "80px", }}>
          <Card
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "0px",
              margin: "15px",
            }}
          >

            <h4 style={{ textDecorationStyle: "bold" }} align="left">
              Data Peminjam
          </h4>
            <br />

            <List>
              <TextField
                required
                id="standard-name"
                label="Nama Peminjam"
                name="student"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.student}
                onChange={this.handleChange}
                margin="normal"
              />
            </List>
            <List>
              <Select
                open={this.state.calss}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.class}
                onChange={this.handleChangeOptionClass}
                inputProps={{
                  name: "class",
                  id: "demo-controlled-open-select"
                }}
                style={{ width: "100%" }}
                name="class"
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
                required
                id="standard-name"
                label="NIS"
                name="nis"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.nis}
                onChange={this.handleChange}
                margin="normal"
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
            <h4 style={{ textDecorationStyle: "bold" }} align="left">
              Detail Peminjaman
          </h4>
            <br />

            <List>
              <TextField
                required
                id="standard-name"
                label="Judul Buku"
                name="bookName"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.bookName}
                onChange={this.handleChange}
                margin="normal"
              />
            </List>
            <List>
              <TextField
                required
                id="standard-name"
                label="Penerbit"
                name="publisher"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.publisher}
                onChange={this.handleChange}
                margin="normal"
              />
            </List>
            <List>
              <TextField
                required
                id="standard-name"
                label="Tahun Terbit"
                name="publicationYear"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.publicationYear}
                onChange={this.handleChange}
                margin="normal"
                type="number"
              />
            </List>
            <List>
              <TextField
                required
                id="standard-name"
                label="Kode Buku"
                name="bookcode"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.bookcode}
                onChange={this.handleChange}
                margin="normal"
                type="text"
              />
            </List>
            <List>
              <TextField
                required
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
                required
                id="standard-name"
                label="Catatan"
                name="note"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.note}
                onChange={this.handleChange}
                margin="normal"
                type="textarea"
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

          {
            this.state.data.map(key => {
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
            })
          }

          {
            this.state.buttonEnable ? (
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
        <br />
        {this.state.link ? <Redirect to="/" /> : ""}
      </div >
    );
  }
}

AddOrderContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddOrderContainer);