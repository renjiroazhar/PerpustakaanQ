import React, { Component } from "react";
import {
  Table,
  Divider,
  Button,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

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

// const FormItem = Form.Item;

class BagianContainer extends Component {
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
    bagianId: "",
    iduser: "",
    emailVerified: true
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/People?filter={"where":{"role":2}}`)
      .then(resp => {
        console.log(resp);
        this.setState({
          data: resp.data,
          loading : true
        });
      });
  };

  addData = () => {
    axios
      .post("https://purchasing-stagging.herokuapp.com/api/People", {
        role: this.state.role,
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        emailVerified: this.state.emailVerified
      })
      .then(response => {
        this.setState({
          role: 0,
          nama: "",
          username: "",
          email: "",
          password: "",
          emailVerified: true
        });
        this.getData();
      });
  };

  deleteData = _id => {
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/People/${_id}`)
      .then(res => {
        this.getData();
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
          title: "Bagian",
          dataIndex: "bagianId"
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
        {/* <button >Add</button> */}
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

// const data = [
//     {
//       key: "1",
//       name: "Tahrom",
//       role: "admin",
//       divisi: {
//           id: "9ahsduh",
//           name: "owner"
//       },
//       bagian: {
//         id: "9ahsduh",
//         name: "owner"
//       }
//     }
//   ];

// const columns = [
//     {
//       title: "Nama Barang",
//       dataIndex: "name",
//       filters: [{
//           text: 'Joe',
//           value: 'Joe',
//         }, {
//           text: 'Jim',
//           value: 'Jim',
//         }],
//       filterMultiple: true,
//       // specify the condition of filtering result
//       // here is that finding the name started with `value`
//       onFilter: (value, record) => record.name.indexOf(value) === 0,
//       sorter: (a, b) => a.name.length - b.name.length
//     },
//     {
//       title: "Pemesan",
//       dataIndex: "name",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.age - b.age
//     },
//     {
//       title: "Tanggal",
//       dataIndex: "age",
//       sorter: (a, b) => a.address.length - b.address.length
//     },
//     {
//       title: "Harga",
//       dataIndex: "age",
//       sorter: (a, b) => a.address.length - b.address.length
//     },
//     {
//       title: "Catatan",
//       dataIndex: "catatan",
//     },
//     {
//       title: "Status",
//       dataIndex: "age",
//       filters: [
//         {
//           text: "London",
//           value: "London"
//         },
//         {
//           text: "New York",
//           value: "New York"
//         }
//       ],
//       filterMultiple: false,
//       onFilter: (value, record) => record.address.indexOf(value) === 0,
//       sorter: (a, b) => a.address.length - b.address.length
//     },
//     {
//       title: "Action",
//       dataIndex: "age",
//     }
//   ];

//   const data = [
//     {
//       key: "1",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       catatan: "-"
//     },
//     {
//       key: "2",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       catatan: "-"
//     },
//     {
//       key: "3",
//       name: "Joe Black",
//       age: 32,
//       address: "Sidney No. 1 Lake Park",
//       catatan: "-"
//     },
//     {
//       key: "4",
//       name: "Jim Red",
//       age: 32,
//       address: "London No. 2 Lake Park",
//       catatan: "-"
//     }
//   ];

export default BagianContainer;
