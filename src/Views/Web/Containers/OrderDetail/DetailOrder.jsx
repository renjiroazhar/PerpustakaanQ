import React, { Component } from "react";
import { Input } from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

const { TextArea } = Input;
const InputGroup = Input.Group;
class DetailOrder extends Component {
  state = {
    data: [],
    kode: "",
    student: "",
    nis: 0,
    bookname: "",
    bookcode: "",
    class: "",
    count: 0,
    publicationYear: 0,
    publisher: "",
    edit: false
  };

  getDataById = () => {
    axios
      .get(
        `http://localhost:8000/api/Items/${
          this.props.match.params.id
        }?filter={"include":"borrow"}`
      )
      .then(res => {
        var datas = res.data;
        const kode = datas.borrow.borrowCode;
        const student = datas.borrow.student;
        const kelas = datas.borrow.class;
        const nis = datas.borrow.nis;
        const bookname = datas.bookname;
        const bookcode = datas.bookcode;
        const publisher = datas.publisher;
        const publicationYear = datas.publicationYear;
        const count = datas.count;

        console.log(datas);
        this.setState({
          data: datas,
          kode: kode,
          student: student,
          class: kelas,
          nis: nis,
          bookname: bookname,
          bookcode: bookcode,
          publisher: publisher,
          publicationYear: publicationYear,
          count: count
        });
      });
  };

  gantiData = () => {
    axios
      .patch(`http://localhost:8000/api/Items/${this.props.match.params.id}`, {
        bookname : this.state.bookname,
        bookcode : this.state.bookcode,
        publisher : this.state.publisher,
        publicationYear : this.state.publicationYear,
        count : this.state.count
      })
      .then(res => {
        this.setState({
          edit: false
        });
      })
      .catch(err => console.log(err.response.data));
  };

  deleteData = () => {
    axios
      .delete(`http://localhost:8000/api/Items/${this.props.match.params.id}`)
      .then(res => {
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

  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleBatalEdit = () => {
    this.setState({ edit: false });
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
    return (
      <div>
        <div>
          <h1 style={{ marginLeft: "15px" }}>Detail Peminjaman :</h1>
        </div>

        <div>
          {this.state.edit ? (
            <div style={{ float: "left" }}>
              <Fab
                variant="extended"
                aria-label=""
                style={{ backgroundColor: "red", color: "white" }}
                onClick={this.handleBatalEdit}
              >
                <CancelIcon />
                Batal Mengedit
              </Fab>
            </div>
          ) : (
            <Fab onClick={this.handleEdit} variant="extended" aria-label="">
              <EditIcon />
              Edit Data Peminjaman
            </Fab>
          )}
          <div style={{ float: "right" }}>
            <Fab
              variant="extended"
              aria-label=""
              style={{ backgroundColor: "red", color: "white" }}
              onClick={this.deleteData}
            >
              <DeleteIcon />
              Hapus Data Peminjaman
            </Fab>
          </div>
        </div>
        <br />
        <br />
        <br />

        {this.state.edit ? (
          <div>
            <form>
              <fieldset>
                <InputGroup
                  style={{ background: "#f7f7f7", padding: "35px" }}
                  size="large"
                >
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Kode Peminjaman
                  </h5>
                  <Input
                    disabled
                    name="kode"
                    value={this.state.kode}
                    placeholder="Kode Peminjaman"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Nama Peminjam
                  </h5>
                  <Input
                    disabled
                    name="student"
                    value={this.state.student}
                    placeholder="Nama Peminjam"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    NIS
                  </h5>
                  <Input
                    disabled
                    name="nis"
                    value={this.state.nis}
                    placeholder="NIS"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Kelas
                  </h5>
                  <Input
                    disabled
                    name="class"
                    value={this.state.class}
                    placeholder="Judul Buku"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Judul Buku
                  </h5>
                  <Input
                    name="bookname"
                    value={this.state.bookname}
                    placeholder="Judul Buku"
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                  
                  />
                  <br />
                  <br />

                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Kode Buku
                  </h5>
                  <TextArea
                    name="bookcode"
                    value={this.state.bookcode}
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
                    Penerbit
                  </h5>
                  <Input
                    name="publisher"
                    value={this.state.publisher}
                    placeholder="Penerbit"
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                  
                  />
                  <br />
                  <br />

                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Tahun Penerbitan
                  </h5>
                  <TextArea
                    name="publicationYear"
                    value={this.state.publicationYear}
                    onChange={this.handleChange}
                    className
                    placeholder="Tahun Penerbitan"
                    style={{ color: "rgba(0, 0, 0, .25);" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Jumlah Buku Yang Dipinjam
                  </h5>
                  <Input
                    name="count"
                    value={this.state.count}
                    placeholder="Jumlah Buku"
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                  
                  />
                 
                </InputGroup>
              </fieldset>
            </form>
            <div style={{textAlign: 'center'}}>
            <Fab onClick={this.gantiData} variant="extended" aria-label="" color="primary">
              Simpan Perubahan
            </Fab>
            </div>
          </div>
        ) : (
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
                    Kode Peminjaman
                  </h5>
                  <Input
                    name="kode"
                    value={this.state.kode}
                    placeholder="Kode Peminjaman"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Nama Peminjam
                  </h5>
                  <Input
                    name="student"
                    value={this.state.student}
                    placeholder="Nama Peminjam"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    NIS
                  </h5>
                  <Input
                    name="nis"
                    value={this.state.nis}
                    placeholder="NIS"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Kelas
                  </h5>
                  <Input
                    name="class"
                    value={this.state.class}
                    placeholder="Judul Buku"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Judul Buku
                  </h5>
                  <Input
                    name="bookname"
                    disabled
                    value={this.state.bookname}
                    placeholder="Judul Buku"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />

                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Kode Buku
                  </h5>
                  <TextArea
                    disabled
                    name="bookcode"
                    value={this.state.bookcode}
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
                    Penerbit
                  </h5>
                  <Input
                    name="publisher"
                    disabled
                    value={this.state.publisher}
                    placeholder="Penerbit"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />

                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Tahun Penerbitan
                  </h5>
                  <TextArea
                    disabled
                    name="publicationYear"
                    value={this.state.publicationYear}
                    onChange={this.handleChange}
                    className
                    placeholder="Tahun Penerbitan"
                    style={{ color: "rgba(0, 0, 0, .25);" }}
                  />
                  <br />
                  <br />
                  <h5
                    align="left"
                    style={{ marginBottom: "10px", marginTop: "20px" }}
                  >
                    Jumlah Buku Yang Dipinjam
                  </h5>
                  <Input
                    name="count"
                    disabled
                    value={this.state.count}
                    placeholder="Jumlah Buku"
                    style={{ width: "100%" }}
                  />

                </InputGroup>
              </fieldset>
            </form>
          </div>
        )}

        {this.state.link ? <Redirect to="/" /> : ""}
      </div>
    );
  }
}

export default DetailOrder;
