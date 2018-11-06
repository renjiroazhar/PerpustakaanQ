import React from "react";
import {
  Form,
  Row,
  Col,

  Input,
  Button,

  notification
} from "antd";
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

  state = {
    role: 0,
    name: "",
    username: "",
    data: [],
    email: "",
    password: "",
    link: false,
    emailVerified: true,
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.getDataEdit();
  }

  render() {
    let userId = sessionStorage.getItem("userId");
    return (
      <div>
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

          {this.state.link ? <Redirect to="/" /> : ""}
        </div>
      </div>
    );
  }
}

export default AccountContainer;
