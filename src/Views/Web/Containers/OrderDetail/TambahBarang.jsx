import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import { Input, Select, Button, Table, message } from "antd";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;

const warning = () => {
  message.warning("Maaf Nama Barang Tidak Boleh Ada Yang Sama, Mohon Teliti barang Yang Anda beli :)");
};
class TambahBarang extends Component {
  state = {
    dataSource: [], // Check here to configure the default column
    loading: false,
    status: 0,
    orderCode: "",
    category: "",
    note: "",
    id: "",
    divisiId: "",
    bagianId: "",

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

    link: false
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
          lastPurchaser: datas[index].lastPurchaser,
          store: datas[index].store,
          address: datas[index].address,
          telephone: datas[index].telephone,
          web: datas[index].web,
          description: datas[index].description,
          note: datas[index].note,
          lastPrice: datas[index].lastPrice,
          total: datas[index].total,
          count: datas[index].count,
          unitPrice: datas[index].unitPrice,
          purchasePrice: datas[index].purchasePrice,
          status: datas[index].status,
          orderId: this.props.match.params.id
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
            data: [],
            link : true
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
      total: totalHarga
    });
    console.log(this.state.data);
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


  componentDidMount() {
    console.log(this.props.location.state.orderId);
    console.log(this.props.match.params.id);
    console.log(this.props.location.state.orderCode);
  }

  render() {
    let totalSemuaHarga = this.state.totalSemua;
    var formattednum_totalSemua = Number(totalSemuaHarga).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    const columns = [
      {
        title: "Nama Barang",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Catatan",
        dataIndex: "note",
        key: "note"
      },
      {
        title: "Harga",
        dataIndex: "unitPrice",
        key: "unitPrice"
      },
      {
        title: "Jumlah",
        dataIndex: "count",
        key: "count"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total"
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
                  lastPurchaser: record.lastPurchaser,
                  name: record.name,
                  note: record.note,
                  unitPrice: record.unitPrice,
                  count: record.count,
                  total: record.total
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
        <h2 style={{ textDecoration: "underline" }}>Tambah Barang Belanjaan</h2>

        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <h2 style={{ textDecorationStyle: "bold" }} align="left">
            Detail Pesanan
          </h2>
          <br />
          <Col span={6} style={{ marginRight: "40px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Kategori
            </h5>
            <Select
              defaultValue="Kategori"
              name="category"
              onChange={this.handleChangesOptionCategory}
              value={this.state.category}
              style={{ width: "400px" }}
            >
              <Option value=""><em>None</em></Option>
              <Option value="Elektronik">Elektronik</Option>
              <Option value="Jasa/Tenaga borong">Jasa/Tenaga borong</Option>
              <Option value="Material Bangunan">Material Bangunan</Option>
              <Option value="Obat-obatan">Obat-obatan</Option>
              <Option value="Pakan ternak">Pakan ternak</Option>
              <Option value="Peralatan kerja">Peralatan kerja</Option>
              <Option value="Perlengkapan satwa">Perlengkapan satwa</Option>
              <Option value="Sparepart">Sparepart</Option>
              <Option value="Service/Inventaris">Service/Inventaris</Option>
              <Option value="Lain-lain">Lain-lain</Option>
            </Select>
          </Col>
          <Col span={6} style={{ width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nama Toko
            </h5>
            <Input
              name="store"
              value={this.state.store}
              onChange={this.handleChange}
              placeholder="Nama Toko"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nama Barang
            </h5>
            <Input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              placeholder="Nama Barang"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Alamat Toko
            </h5>
            <Input
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              placeholder="Alamat Toko"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Merk
            </h5>
            <Input
              name="merk"
              value={this.state.merk}
              onChange={this.handleChange}
              required
              placeholder="Merk"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Nomor Telepon
            </h5>
            <Input
              name="telephone"
              value={this.state.telephone}
              onChange={this.handleChange}
              placeholder="Nomor Telepon"
              type="number"
            />
          </Col>
          <Col
            span={6}
            style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Spesifikasi
            </h5>
            <Input
              name="spec"
              value={this.state.spec}
              onChange={this.handleChange}
              required
              placeholder="Spesifikasi"
            />
          </Col>
          <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Website
            </h5>
            <Input
              name="web"
              value={this.state.web}
              onChange={this.handleChange}
              placeholder="Website"
            />
          </Col>
          <Col
            span={5}
            style={{ marginRight: "15px", width: "30%", marginTop: "20px" }}
          >
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Harga
            </h5>
            <Input
              style={{ width: "200px" }}
              
              name="unitPrice"
              type="number"
              value={this.state.unitPrice}
              onChange={this.handleChange}
              placeholder="Harga"
            />
          </Col>
          <Col span={1} style={{ width: "20%" }}>
            <h5
              align="left"
              style={{ marginBottom: "10px", marginTop: "20px" }}
            >
              Jumlah
            </h5>
            <Input
              name="count"
              value={this.state.count}
              onChange={this.handleChange}
              placeholder="Jumlah"
              style={{ width: "100px" }}
              type="number"
            />
          </Col>
          <Col span={6} style={{ width: "47%" }}>
            <h5
              align="left"
              style={{ marginBottom: "10px", marginTop: "20px" }}
            >
              Catatan
            </h5>
            <TextArea
              name="note"
              value={this.state.note}
              onChange={this.handleChange}
              placeholder="Catatan"
            />
          </Col>
          <Col span={3} style={{ marginTop: "20px", width: "25%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Total Harga
            </h5>
            <Input
              name="total"
              value={this.state.total}
              onChange={this.handleChange}
              placeholder="Total Harga"
              type="number"
              
            />
          </Col>

          <Col span={1} style={{ marginTop: "20px", width: "10%" }}>
            <Button
              style={{
                backgroundColor: "#00ae69",
                width: "250px",
                height: "45px",
                borderColor: "transparent",
                fontWeight: "bold",
                fontSize: "13px",
                marginTop: "25px",
                marginLeft: "460px"
              }}
              type="primary"
              onClick={() => {
                this.pushData();
              }}
            >
              SUBMIT
            </Button>
          </Col>
        </InputGroup>

        <br />

        <div>
          <Table columns={columns} dataSource={this.state.data} />
        </div>

        <br />
        <div style={{ background: "#f7f7f7", padding: "35px" }}>
          <Row>
            <Col span={4}>
              <div>
                <h2 marginRight="15px">Total Harga : </h2>
              </div>
            </Col>
            <Col span={4}>
              <h2 style={{ color: "#00ae69" }}>{formattednum_totalSemua}</h2>
              <br/>
            </Col>
            </Row>

            <Row>
              <Link to={`/orderdetail/${this.props.match.params.id}/update`}>
              <Button
               
                style={{
                  backgroundColor: "#f0555a",
                  width: "200px",
                  height: "45px",
                  borderColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "13px",
                  float : "left"
                }}
                type="primary"
                size="large"
              >
                BATAL
              </Button>
              </Link>

           
              <Button
                style={{
                  backgroundColor: "#00ae69",
                  width: "250px",
                  height: "45px",
                  borderColor: "transparent",
                  fontWeight: "bold",
                  fontSize: "13px",
                  marginLeft: "255px",
                  float : "right"
                }}
                type="primary"
                size="large"
                onClick={() => {
                 this.kirimDataItem();                
                }}
              >
                TAMBAH BARANG
              </Button>
              {this.state.link ? <Redirect to={`/orderdetail/${this.props.match.params.id}/update`} /> : ""}
            </Row>

        </div>
           <br />
      </div>
    );
  }
}

export default TambahBarang;
