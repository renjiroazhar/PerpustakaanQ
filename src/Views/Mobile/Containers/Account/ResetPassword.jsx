import React, { Component } from "react";
import { NavBar, Card, List, Button } from "antd-mobile";
import { notification } from 'antd';
import Cancel from "./svg/cancel.svg";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

const openNotificationWithIcon = type => {
  notification[type]({
    message: "Password Berhasil Diganti",
    description: "Selalu Ingat Password Anda , agar bisa Masuk Kembali"
  });
};

const notifikasiGagalResetPassword = type => {
  notification[type]({
    message: "Gagal Mereset Password",
    description: "Password Baru dan Konfirmasi Harus sama"
  });
};
export default class ResetPassword extends Component {

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  state = {
    role: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    link: false,
    emailVerified: true,
    data: []
  };

  getDataEdit = () => {
    let userId = sessionStorage.getItem("userId");
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/People/${userId}`)
      .then(res => {
        this.setState({
          role: res.data.role,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          emailVerified: res.data.emailVerified
        });
      });
  };

  editData = _id => {
    if (this.state.password === this.state.confirmPassword) {
      axios
        .put(`https://purchasing-stagging.herokuapp.com/api/People/${_id}`, {
          role: this.state.role,
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          emailVerified: this.state.emailVerified
        })
        .then(response => {
          openNotificationWithIcon("success");
          this.setState({
            link: true,
            emailVerified: true
          });
          this.getDataEdit();
        });
    } else {
      return notifikasiGagalResetPassword("warning");
    }
  };

  componentDidMount() {
    this.getDataEdit();
  }


  render() {
    let userId = sessionStorage.getItem("userId");
    return (
      <div>
        <NavBar
          mode="light"
          icon={
            <Link to={`/account/`}>
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
            backgroundColor: "#872ef5",
            padding: "25px 0px 25px 0px"
          }}
        >
          <p style={{ color: "#fff", marginTop: "17px" }}>GANTI KATA SANDI</p>
        </NavBar>

        <div style={{ margin: "15px" }}>
          <Card
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "0px",
              border: "3px #000"
            }}
          >
            <List>
              <TextField
                id="standard-name"
                label="Masukkan Kata Sandi Lama"
                name=""
                width="100%"
                style={{ width: "100%" }}
                ref="oldPassword"
                type="password"
                margin="normal"
              />
            </List>
            <List>
              <TextField
                id="standard-name"
                label="Masukkan Kata Sandi Baru"
                type="password"
                name="password"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
              />
            </List>
            <List>
              <TextField
                id="standard-name"
                type="password"
                name="confirmPassword"
                label="Konfirmasi Kata Sandi Baru"
                width="100%"
                style={{ width: "100%" }}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                margin="normal"
              />
            </List>
          </Card>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button
            inline
            style={{
              borderRadius: "50px",
              backgroundColor: "#00ae69",
              color: "#fff",
              width: "90%",
            }}
            onClick={() => {
              this.editData(userId);
            }}
          >
            RESET PASSWORD
        </Button>
          {this.state.link ? (<Redirect to="/account" />) : ("")}
        </div>
      </div>
    );
  }
}