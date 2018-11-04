import React from "react";
import {
  Form,
  Row,
  Col,
  Card,
  
  Input,
  Button,
  
  notification
} from "antd";
import logoCoin from "./svg/currency.svg";
import axios from "axios";
import { Redirect } from "react-router-dom";

const FormItem = Form.Item;

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
class AccountContainer extends React.Component {
  handleSubmit = () => {
    // const { password, confirmPassword } = this.state;
    // // perform all neccassary validations
    // if (password !== confirmPassword) {
    //   alert(`Passwords don't match!!!!!`);
    // } else {
    //   alert("Horeee");
    // }
  };

  state = {
    role: 0,
    name: "",
    username: "",
    data: [],
    email: "",
    password: "",
    link: false,
    emailVerified: true,
    totalAnggaran: 0
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

  deleteData = _id => {
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/People/${_id}`)
      .then(response => {
        this.setState({
          link: true
        });
        this.getDataEdit();
      });
  };

  inputAnggaran = () => {
    axios
      .patch(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/5bbb2b7cf48e2928821bcae0",
        {
          totalAnggaran: this.state.totalAnggaran
        }
      )
      .then(res => {
        this.setState({
          totalAnggaran: 0
        });
      });
  };

  getDataAnggaran = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalAnggaran"
      )
      .then(res => {
        this.setState({
          data: res.data
        });
        console.log(res);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.getDataEdit();
    this.getDataAnggaran();
  }

  render() {
    let userId = sessionStorage.getItem("userId");
    let anggaranSemua = this.state.data.totalAnggaran
    var formated_num = Number(anggaranSemua).toLocaleString("in-ID", {style: "currency", currency: "IDR"}); 
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
                  <h2 style={{ color: "white" }} >
                   {formated_num}
                  </h2>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
        <div style={{ background: "#f7f7f7", padding: "35px" }} size="large">
          <h2>Reset Password</h2>
          <br />
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Row>
              <Col span={4} style={{ marginRight: "52px", width: "28%" }}>
                <h5 align="left" style={{ marginBottom: "10px" }}>
                  Masukkan kata sandi lama
                </h5>

                <FormItem>
                  <Input
                    ref="oldPassword"
                    type="password"
                    style={{ width: "270px" }}
                    placeholder="**********"
                  />
                </FormItem>
              </Col>

              <Col span={4} style={{ marginRight: "52px", width: "28%" }}>
                <h5 align="left" style={{ marginBottom: "10px" }}>
                  Masukkan kata sandi baru
                </h5>
                <FormItem>
                  <Input
                    type="password"
                    style={{ width: "270px" }}
                    placeholder="**********"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormItem>
              </Col>
              <Col span={4} style={{ marginRight: "px", width: "28%" }}>
                <h5 align="left" style={{ marginBottom: "10px" }}>
                  Konfirmasi kata sandi baru
                </h5>
                <FormItem>
                  <Input
                    type="password"
                    name="confirmPassword"
                    style={{ width: "270px" }}
                    placeholder="**********"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button
                style={{
                  width: "240px",
                  height: "50px",
                  marginTop: "30px",
                  marginLeft: "680px",
                  backgroundColor: "#00ae69",
                  fontWeight: "bold",
                  color: "white"
                }}
                onClick={() => {
                  this.editData(userId);
                  this.handleSubmit();
                }}
              >
                RESET PASSWORD
              </Button>
            </FormItem>
          </Form>
        </div>

        <br />
        <div style={{ background: "#f7f7f7", padding: "35px" }} size="large">
          <h2>Masukkan Anggaran</h2>
          <br />
          <Row>
            <Col span={4} style={{ marginRight: "52px", width: "28%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Nominal
              </h5>
              <Input
                name="totalAnggaran"
                value={this.state.totalAnggaran}
                onChange={this.handleChange}
                style={{ width: "270px" }}
                placeholder="Nominal"
                type="number"
              />
            </Col>
            <Col span={8} style={{ marginRight: "52px", width: "28%" }}>
              <Button
                style={{
                  width: "240px",
                  height: "50px",
                  marginTop: "5px",
                  marginLeft: "350px",
                  backgroundColor: "#00ae69",
                  fontWeight: "bold",
                  color: "white"
                }}
                onClick={() => {
                  this.inputAnggaran();
                }}
              >
                SUBMIT
              </Button>
            </Col>
          </Row>
          {this.state.link ? <Redirect to="/" /> : ""}
        </div>
      </div>
    );
  }
}

export default AccountContainer;
