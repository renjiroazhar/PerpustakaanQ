import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import { Input, Select, Button, Table, message, notification } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";

const InputGroup = Input.Group;
const { Option, OptGroup } = Select;
const { TextArea } = Input;

const warning = () => {
  message.warning(
    "Maaf Kode Buku Tidak Boleh Ada Yang Sama, Mohon Teliti kode yang Anda masukkan :)"
  );
};

const notifikasiAddOrder = type => {
  notification[type]({
    message: "Transaksi Berhasil",
  });
};

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

  handleChangesOptionCategory = value => {
    this.setState({ category: value });
  };

  handleChangesOptionClass = value => {
    this.setState({ class: value });
  };

  render() {
    const columns = [
      {
        title: "Judul Buku",
        dataIndex: "bookName",
        key: "bookName"
      },
      {
        title: "Tahun Penerbitan",
        dataIndex: "publicationYear",
        key: "publicationYear"
      },
      {
        title: "Penerbit",
        dataIndex: "publisher",
        key: "publisher"
      },
      {
        title: "Jumlah",
        dataIndex: "count",
        key: "count"
      },
      {
        title: "Catatan",
        dataIndex: "note",
        key: "note"
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <span>
            <Button
              style={{
                backgroundColor: "#f0555a",
                borderColor: "transparent",
                borderRadius: "3px"
              }}
              type="primary"
              size="small"
              onClick={e =>
                this.deleteData({
                  bookname: record.bookname,
                  note: record.note,
                  publicationYear: record.publicationYear,
                  count: record.count,
                  publisher: record.publisher
                })
              }
            >
              <Icon type="delete" theme="outlined" />
            </Button>
          </span>
        )
      }
    ];
    return (
      <div>
        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <h2 style={{ textDecorationStyle: "bold" }} align="left">
            Data Peminjam
          </h2>

          <br />

          <Row>
            <Col
              span={6}
              style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
            >
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Nama Peminjam
              </h5>
              <Input
                name="student"
                value={this.state.student}
                placeholder="Nama Peminjam"
                onChange={this.handleChange}
              />
            </Col>
            <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Kelas
              </h5>
              <Select
                name="class"
                defaultValue="Kelas"
                value={this.state.class}
                onChange={this.handleChangesOptionClass}
                style={{ width: "450px" }}
              >
                <Option value="">
                  <em>-Pilih Kelas-</em>
                </Option>
                <OptGroup label="Rekayasa Perangkat Lunak">
                  <Option value="XI RPL 1">XI RPL 1</Option>
                  <Option value="XI RPL 2">XI RPL 2</Option>
                  <Option value="XI RPL 3">XI RPL 3</Option>
                </OptGroup>

                <OptGroup label="Perawatan Sosial">
                  <Option value="XI PS 1">XI PS 1</Option>
                  <Option value="XI PS 2">XI PS 2</Option>
                  <Option value="XI PS 3">XI PS 3</Option>
                </OptGroup>

                <OptGroup label="Multimedia">
                  <Option value="XI MM 1">XI MM 1</Option>
                  <Option value="XI MM 2">XI MM 2</Option>
                  <Option value="XI MM 3">XI MM 3</Option>
                </OptGroup>

                <OptGroup label="Teknik Komputer Jaringan">
                  <Option value="XI TKJ 1">XI TKJ 1</Option>
                  <Option value="XI TKJ 2">XI TKJ 2</Option>
                  <Option value="XI TKJ 3">XI TKJ 3</Option>
                </OptGroup>

                <OptGroup label="Caregiver">
                  <Option value="XI CG 1">XI CG 1</Option>
                  <Option value="XI CG 2">XI CG 2</Option>
                  <Option value="XI CG 3">XI CG 3</Option>
                </OptGroup>
              </Select>
            </Col>
          </Row>
          <br />

          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              NIS
            </h5>
            <Input
              name="nis"
              value={this.state.nis}
              placeholder="NIS"
              onChange={this.handleChange}
            />
          </Col>
        </InputGroup>

        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <h2 style={{ textDecorationStyle: "bold" }} align="left">
            Detail Peminjaman
          </h2>
          <br />

          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Judul Buku
            </h5>
            <Input
              name="bookName"
              value={this.state.bookName}
              onChange={this.handleChange}
              required
              placeholder="Judul Buku"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Penerbit
            </h5>
            <Input
              name="publisher"
              value={this.state.publisher}
              onChange={this.handleChange}
              placeholder="Penerbit"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Tahun Penerbitan
            </h5>
            <Input
              name="publicationYear"
              value={this.state.publicationYear}
              onChange={this.handleChange}
              required
              placeholder="Tahun Penerbitan"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Kode Buku
            </h5>
            <Input
              name="bookcode"
              value={this.state.bookcode}
              onChange={this.handleChange}
              placeholder="Kde Buku"
              type="text"
            />
          </Col><Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Jumlah
            </h5>
            <Input
              name="count"
              value={this.state.count}
              onChange={this.handleChange}
              required
              placeholder="Jumlah"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Catatan
            </h5>
            <TextArea
              name="note"
              value={this.state.note}
              onChange={this.handleChange}
              placeholder="Kde Buku"
              type="text"
            />
          </Col>
          
          <br />
          <br />
        </InputGroup>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              backgroundColor: "#00ae69",
              width: "250px",
              height: "45px",
              borderColor: "transparent",
              fontWeight: "bold",
              fontSize: "13px",
              marginTop: "25px",
              justifyContent: "right"
            }}
            type="primary"
            onClick={() => {
              this.pushData();
            }}
          >
            TAMBAH BUKU
          </Button>
        </div>
        <br />

        <div>
          <Table columns={columns} dataSource={this.state.data} />
        </div>

        <br />
        <div style={{ background: "#f7f7f7", marginTop: "40px" }}>
          {this.state.placeOrder ? (
            <div style={{ textAlign: "right" }}>
              <Button
                style={{
                  backgroundColor: "#00ae69",
                  width: "250px",
                  height: "45px",
                  borderColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "13px"
                }}
                type="primary"
                size="large"
                onClick={() => {
                  this.kirimData();
                }}
              >
                SELESAI
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: "right" }}>
              <Button
                disabled
                style={{
                  backgroundColor: "#A5A5A5",
                  width: "250px",
                  height: "45px",
                  borderColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "13px"
                }}
                type="primary"
                size="large"
                onClick={() => {
                  this.kirimData();
                }}
              >
                PLACE ORDER
              </Button>
            </div>
          )}
        </div>
        <br />
        {this.state.link ? <Redirect to="/" /> : ""}
      </div>
    );
  }
}

export default AddOrderContainer;
