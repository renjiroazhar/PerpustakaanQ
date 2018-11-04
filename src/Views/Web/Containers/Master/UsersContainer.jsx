import React, { Component } from "react";
import {
  Table,
  Icon,
  Divider,
  Modal,
  Button,
  Form,
  Input,
  Select
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const Option = Select.Option;

// const bagian = [
//   {
//     id: 1,
//     name: "Administrasi"
//   },
//   {
//     id: 2,
//     name: "Front Office"
//   },
//   {
//     id: 3,
//     name: "Keuangan"
//   },
//   {
//     id: 4,
//     name: "Operasional"
//   },
//   {
//     id: 5,
//     name: "PPP"
//   }
// ];

// const divisi = [
//   {
//     id: 1,
//     name: "Gudang"
//   },
//   {
//     id: 2,
//     name: "Gudang Ikan"
//   },
//   {
//     id: 3,
//     name: "Kebersihan"
//   },
//   {
//     id: 4,
//     name: "Outbond"
//   },
//   {
//     id: 5,
//     name: "Pertamanan"
//   },
//   {
//     id: 6,
//     name: "Rekreasi"
//   },
//   {
//     id: 7,
//     name: "Restoran"
//   },
//   {
//     id: 8,
//     name: "Technical Support"
//   },
//   {
//     id: 7,
//     name: "Security"
//   }
// ];

// const role = ["admin", "purchasing", "security", "kadiv", "kabag"];

const FormItem = Form.Item;

class UsersContainer extends Component {
  state = {
    data: [],
    isRefresh: false,
    isModalOpen: false,
    role: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    divisi: "",
    bagian: "",
    iduser: "",
    emailVerified: true,

    loading: false
  };

  
  getData = () => {
    axios
      .get("https://purchasing-stagging.herokuapp.com/api/People")
      .then(resp => {
        console.log(resp);
        this.setState({
          data: resp.data,
          loading: true
        });
      });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      isModalOpen: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      isModalOpen: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  add = () => {
    this.setState({
      isModalOpen: true
    });
  };

  edit = () => {
    this.setState({
      isModalOpen: true
    });
  };

  handleChangesOption = value => {
    this.setState({ role: value });
  };

  handleBlur = () => {
    console.log("blur");
  };

  handleFocus = () => {
    console.log("focus");
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const columns = [
      {
        title: "Nama",
        dataIndex: "name",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: "Email",
        dataIndex: "email",
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: "Posisi",
        dataIndex: "role",
        render: (text, record) => {
          if (record.role === 1 || record.role === "Kadiv") {
            return <h4>Kadiv</h4>;
          } else if (record.role === 2 || record.role === "Kabag") {
            return <h4>Kabag</h4>;
          } else if (record.role === 3 || record.role === "Manager") {
            return <h4>Manager</h4>;
          } else if (record.role === 4 || record.role === "Owner") {
            return <h4>Owner</h4>;
          } else if (record.role === 5 || record.role === "Purchaser") {
            return <h4>Purchaser</h4>;
          }
        }
      },
      {
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <span>
            <Link to={`/master/users/${record.id}`}>
              <Button
                style={{
                  backgroundColor: "#A5A5A5"
                }}
                type="primary"
                icon="edit"
              >
                Edit
              </Button>
            </Link>
            <Divider type="vertical" />
          </span>
        )
      }
    ];

    return (
      <div>
        <Button
          style={{
            textAlign: "center",
            backgroundColor: "#0099ff",
            width: "13%",
            borderColor: "transparent",
            borderRadius: "3px",
            marginBottom: "20px"
          }}
          type="primary"
          icon="user-add"
          size="large"
          onClick={this.add}
        >
          Add User
        </Button>
        
        {this.state.loading ? (
          <Table columns={columns} dataSource={this.state.data} />
        ) : (
          <h1 style={{ textAlign: "center" }}>
            Loading <Icon type="loading" theme="outlined" />
          </h1>
        )}

        <Modal
          title="Data"
          visible={this.state.isModalOpen}
          onOk={() => {
            this.handleOk();
            // this.addData();
          }}
          okText="Add"
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              <Select
                showSearch
                value={this.state.role}
                style={{ width: "100%" }}
                placeholder="Pilih Role"
                defaultValue={{ key: "Admin" }}
                optionFilterProp="children"
                onChange={this.handleChangesOption}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              >
                <Option value={0} disabled><em>-Pilih Posisi-</em></Option>
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
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                onChange={this.handleChange}
              />
            </FormItem>
            <FormItem>
              <Input
                name="email"
                value={this.state.email}
                type="email"
                prefix={
                  <Icon type="email" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                onChange={this.handleChange}
              />
            </FormItem>
            <FormItem>
              <Input
                name="password"
                value={this.state.password}
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}


export default UsersContainer;
