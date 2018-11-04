import React, { Component } from "react";
import {
  Icon,
  Button,
  Form,
  Input,
  Select
} from "antd";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Option = Select.Option;
const FormItem = Form.Item;
export default class UsersUpdate extends Component {
  state = {
    role: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    link: false,
    emailVerified: true
  };

  getDataEdit = () => {
    console.log(this.props.match.params.id);
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/People/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        console.log(res, ">>>>ini res id");
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
        this.setState({
          link: true,
          emailVerified: true
        });
        this.getDataEdit();
      });
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
  };

  handleChangesOption = value => {
    this.setState({ role: value });
  };

  componentDidMount() {
    this.getDataEdit();
  }

  render() {
    return (
      <div>
        <h1>Update Data</h1>
        <Form>
          <FormItem>
            <Select
              showSearch
              value={this.state.role}
              style={{ width: "100%" }}
              placeholder="Pilih Role"
              optionFilterProp="children"
              onChange={this.handleChangesOption}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              // filterOption={(input, option) =>
              //   option.props.children
              //     .toLowerCase()
              //     .indexOf(input.toLowerCase()) >= 0
              // }
            >
               <Option value={0} disabled><em>-Pilih Posisi-</em> </Option>
                <Option value={1}>Kadiv</Option>
                <Option value={2}>Kabag</Option>
                <Option value={3}>Manager</Option>
                <Option value={4}>Owner</Option>
                <Option value={5}>Purchaser</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Input
              name="name"
              value={this.state.name}
              prefix={<Icon style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nama Lengkap"
              onChange={this.handleChange}
            />
          </FormItem>

          <FormItem>
            <Input
              name="username"
              value={this.state.username}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </FormItem>

          <FormItem>
            <Input
              name="email"
              value={this.state.email}
              prefix={
                <Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </FormItem>

          <FormItem>
            <Input
              name="password"
              value={this.state.password}
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </FormItem>
          <Button
            type="primary"
            onClick={() => {
              this.editData(this.props.match.params.id);
            }}
          >
            Edit
          </Button>
          <Link to="/master/users">
            <Button
              type="success"
              style={{
                marginLeft: "30px",
                backgroundColor: "#00ae69",
                color: "white"
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="danger"
            onClick={() => {
              this.deleteData(this.props.match.params.id);
            }}
            style={{
              marginLeft: "780px",
              backgroundColor: "#f0555a",
              color: "white"
            }}
          >
            Hapus User
          </Button>
        </Form>

        {this.state.link ? <Redirect to="/master/users" /> : ""}
      </div>
    );
  }
}
