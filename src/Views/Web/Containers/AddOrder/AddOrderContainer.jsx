import React, { Component } from "react";
import { Row, Col, Card, Icon } from "antd";
import { Input, Select, Button, Table, message, notification } from "antd";
import logoCoin from "./svg/currency.svg";
import logoCard from "./svg/credit-card.svg";
import axios from "axios";
import { Redirect } from "react-router-dom";
import * as moment from "moment";

const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;

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

class AddOrderContainer extends Component {
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
    role: 0,

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
    dataAnggaran: [],
    namaPembeli: "",
    dataEstimasi: [],
    dataOrder: [],
    placeOrder: false,
    dataPembeli: [],
    tanggalBeliTerakhir: "",

    link: false
  };

  getDataOrder = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"status":{"neq":1}}}`
      )
      .then(res => {
        this.setState({
          dataOrder: res.data
        });
        console.log(res.data);
        let namaPembeli;
        let hargaTerakhir;
        let tanggalBeliTerakhiran;
     
        this.state.dataOrder.map(key => {
          return(
            namaPembeli = key.people.name,
            hargaTerakhir = key.totalHarga,
            tanggalBeliTerakhiran = key.createdAt,
            this.setState({
              lastPurchaser: namaPembeli,
              lastPrice: hargaTerakhir,
              tanggalBeliTerakhir: tanggalBeliTerakhiran
            }))
          })
        console.log(hargaTerakhir);
        console.log(this.state.lastPurchaser);
      });
  };
  kirimData = () => {
    var date = new Date();
    var formattedDate = moment(date).format("YYYYMMDD");
    console.log(formattedDate);
    var idPeople = sessionStorage.getItem("userId");

    axios
      .post("https://purchasing-stagging.herokuapp.com/api/Orders", {
        status: this.state.status,
        note: this.state.note,
        category: this.state.category,
        divisiId: this.state.divisiId,
        bagianId: this.state.bagianId,
        orderCode: `${this.state.divisiId}/${
          this.state.bagianId
        }/${formattedDate}`,
        totalHarga: this.state.totalSemua,
        peopleId: idPeople
      })
      .then(res => {
        this.kirimDataItem(res.data.id);
        console.log(res.data);
        this.setState({
          link: true
        });
        notifikasiAddOrder("success");
      })
      .catch(err => console.log(err.response.data));
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
          lastPurchaser: this.state.lastPurchaser,
          store: datas[index].store,
          address: datas[index].address,
          telephone: datas[index].telephone,
          web: datas[index].web,
          description: datas[index].description,
          note: datas[index].note,
          lastPrice: this.state.lastPrice,
          total: datas[index].total,
          count: datas[index].count,
          unitPrice: datas[index].unitPrice,
          purchasePrice: datas[index].purchasePrice,
          status: datas[index].status,
          orderId: _id
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
      total: totalHarga,
      placeOrder: true
    });
    console.log(this.state.data);
  };

  getDataAnggaran = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalAnggaran"
      )
      .then(res => {
        this.setState({
          dataAnggaran: res.data
        });
        console.log(res);
      });
  };

  getTotalEstimasi = () => {
    axios
      .get(
        "https://purchasing-stagging.herokuapp.com/api/Anggarans/getTotalEstimasi"
      )
      .then(res => {
        this.setState({
          dataEstimasi: res.data
        });
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

  getDataEdit = () => {
    let userId = sessionStorage.getItem("userId");
    axios
      .get(`https://purchasing-stagging.herokuapp.com/api/People/${userId}`)
      .then(res => {
        this.setState({
          role: res.data.role,
          namaPembeli: res.data.name,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          emailVerified: res.data.emailVerified
        });
        let jabatan;

        if (this.state.role === 1) {
          jabatan = "Kepala Divisi";
        } else if (this.state.role === 2) {
          jabatan = "Kepala Bagian";
        } else if (this.state.role === 3) {
          jabatan = "Manager";
        } else if (this.state.role === 4) {
          jabatan = "Owner";
        } else if (this.state.role === 5) {
          jabatan = "Purchaser";
        }

        this.setState({
          role: jabatan
        });
      });
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

  componentDidMount() {
    this.getDataAnggaran();
    this.getDataEdit();
    this.getTotalEstimasi();
    this.getDataOrder();
  }

  render() {
    let anggaranSemua = this.state.dataAnggaran.totalAnggaran;
    var formated_num = Number(anggaranSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    let estimasiSemua = this.state.dataEstimasi.totalEstimasi;
    var formattednum_estimasi = Number(estimasiSemua).toLocaleString("in-ID", {
      style: "currency",
      currency: "IDR"
    });

    let totalSemuaHarga = this.state.totalSemua;
    var formattednum_totalSemua = Number(totalSemuaHarga).toLocaleString(
      "in-ID",
      {
        style: "currency",
        currency: "IDR"
      }
    );

    let hargaTerakhir = this.state.lastPrice;
    var formattednum_hargaTerakhir = Number(hargaTerakhir).toLocaleString(
      "in-ID",
      {
        style: "currency",
        currency: "IDR"
      }
    );

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
                  <h2 style={{ color: "white" }} align="right">
                    {formated_num}
                  </h2>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                backgroundColor: "#f0555a",
                height: "100px",
                borderRadius: "7px"
              }}
            >
              <Row style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <img
                    src={logoCard}
                    height="50px"
                    width="50px"
                    alt="Currency free icon"
                    title="Currency free icon"
                  />
                </Col>
                <Col span={16}>
                  <h4 style={{ color: "white" }} align="right">
                    Total Estimasi
                  </h4>
                  <h2 style={{ color: "white" }} align="right">
                    {formattednum_estimasi}
                  </h2>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <br />
        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <h2 style={{ textDecorationStyle: "bold" }} align="left">
            Data Pemesan
          </h2>

          <br />

          <Row>
            <Col
              span={6}
              style={{ marginTop: "20px", marginRight: "40px", width: "47%" }}
            >
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Nama
              </h5>
              <Input
                name="namaPembeli"
                value={this.state.namaPembeli}
                placeholder="Nama"
              />
            </Col>
            <Col span={6} style={{ marginTop: "20px", width: "47%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Jabatan
              </h5>
              <Input
                name="this.state.role"
                value={this.state.role}
                placeholder="Jabatan"
              />
            </Col>
          </Row>
        </InputGroup>

        <InputGroup
          style={{ background: "#f7f7f7", padding: "35px" }}
          size="large"
        >
          <Col span={6} style={{ marginRight: "40px", width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Divisi
            </h5>
            <Select
              name="divisiId"
              defaultValue="Divisi"
              value={this.state.divisiId}
              onChange={this.handleChangesOptionDivisi}
              style={{ width: "450px" }}
            >
              <Option value="">
                <em>None</em>
              </Option>
              <Option value="Gudang">Gudang</Option>
              <Option value="Gudang Ikan">Gudang Ikan</Option>
              <Option value="Kebersihan">Kebersihan</Option>
              <Option value="Outbound">Outbound</Option>
              <Option value="Pertamanan">Pertamanan</Option>
              <Option value="Rekreasi">Rekreasi</Option>
              <Option value="Restoran">Restoran</Option>
              <Option value="Technical Support">Technical Support</Option>
              <Option value="Security">Security</Option>
            </Select>
          </Col>
          <Col span={6} style={{ width: "47%" }}>
            <h5 align="left" style={{ marginBottom: "10px" }}>
              Bagian
            </h5>
            <Select
              defaultValue="Bagian"
              name="bagianId"
              onChange={this.handleChangesOptionBagian}
              value={this.state.bagianId}
              style={{ width: "450px" }}
            >
              <Option value="">
                <em>None</em>
              </Option>
              <Option value="Administrasi">Administrasi</Option>
              <Option value="Front Office">Front Office</Option>
              <Option value="Keuangan">Keuangan</Option>
              <Option value="Operasional">Operasional</Option>
              <Option value="PPP">PPP</Option>
            </Select>
          </Col>
        </InputGroup>

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
              style={{ width: "450px" }}
            >
              <Option value="">
                <em>None</em>
              </Option>
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
              value={this.state.unitPrice}
              onChange={this.handleChange}
              placeholder="Harga"
              type="number"
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

          <Col span={1} style={{ marginTop: "50px", width: "10%" }}>
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
              TAMBAH ORDER
            </Button>
          </Col>
        </InputGroup>

        <br />
        <div style={{ background: "#f7f7f7", padding: "35px" }}>
          <Row>
            <h2 style={{ textDecorationStyle: "bold" }} align="left">
              Info Pesanan Terakhir
            </h2>
            <br />
            <Col span={4} style={{ marginRight: "43px", width: "30%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Total Harga Terakhir
              </h5>
              <Input
                disabled
                style={{ width: "250px" }}
                placeholder="Harga Terakhir"
                value={formattednum_hargaTerakhir}
                name="lasPrice"
              />
            </Col>
            <Col span={4} style={{ marginRight: "43px", width: "30%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Tanggal Beli Terakhir
              </h5>
              <Input
                disabled
                style={{ width: "250px" }}
                placeholder="Tanggal Beli Terakhir"
                value={this.state.tanggalBeliTerakhir}
                name="tanggalBeliTerakhir"
              />
            </Col>
            <Col span={4} style={{ width: "30%" }}>
              <h5 align="left" style={{ marginBottom: "10px" }}>
                Petugas Beli Terakhir
              </h5>
              <Input
                disabled
                style={{ width: "250px" }}
                placeholder="Petugas"
                value={this.state.lastPurchaser}
                name="lastPurchaser"
              />
            </Col>
          </Row>
        </div>
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
            </Col>
            {this.state.placeOrder ? (
              <Col span={4}>
                <Button
                  style={{
                    backgroundColor: "#00ae69",
                    width: "250px",
                    height: "45px",
                    borderColor: "transparent",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginLeft: "375px"
                  }}
                  type="primary"
                  size="large"
                  onClick={() => {
                    this.kirimData();
                  }}
                >
                  PLACE ORDER
                </Button>
              </Col>
            ) : (
              <Col span={4}>
                <Button
                  disabled
                  style={{
                    backgroundColor: "#A5A5A5",
                    width: "250px",
                    height: "45px",
                    borderColor: "transparent",
                    fontWeight: "bold",
                    fontSize: "13px",
                    marginLeft: "375px"
                  }}
                  type="primary"
                  size="large"
                  onClick={() => {
                    this.kirimData();
                  }}
                >
                  PLACE ORDER
                </Button>
              </Col>
            )}
          </Row>
        </div>
        <br />
        {this.state.link ? <Redirect to="/" /> : ""}
      </div>
    );
  }
}

export default AddOrderContainer;
