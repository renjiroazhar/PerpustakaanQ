import React, { Component } from "react";
import { NavBar, Card, Button } from "antd-mobile";
import { Link } from "react-router-dom";
import axios from "axios";
import { Icon } from "antd";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class MyOrderDetail extends Component {
  state = {
    dataSource: [], // Check here to configure the default column
    loading: false,
    status: 0,
    orderCode: "",
    note: "",
    id: "",
    divisiId: "",
    bagianId: "",

    dataAll: [],
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
    link: false,
    orderId: "",
    data: [],
    orderDetail: [],
    key: 0,
    totalSemua: 0,
    enableEdit: false,

    category: "",

    expanded: null,
    totalHarga: 0,
    dataOrderId: []
  };

  getDataById = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders/${
          this.props.match.params.id
        }/items`
      )
      .then(res => {
        var datas = res.data;
        console.log(res, ">>>>ini res id");
        this.setState({
          orderDetail: datas,
          loading: true
        });
      });
  };

  getDataOrderId = () => {
    axios
      .get(
        `https://purchasing-stagging.herokuapp.com/api/Orders/${
          this.props.match.params.id
        }`
      )
      .then(res => {
        var datas = res.data;
        console.log(res, ">>>>ini res id");
        this.setState({
          category: datas.category,
          note: datas.note,
          divisiId: datas.divisiId,
          bagianId: datas.bagianId,
          orderCode: datas.orderCode,
          totalHarga: datas.totalHarga,
          dataOrderId: res.data
        });
        console.log(this.state.dataOrderId.id);
      });
  };

  gantiData = _id => {
    axios
      .patch(`https://purchasing-stagging.herokuapp.com/api/Orders/${_id}`, {
        note: this.state.note,
        category: this.state.category
      })
      .then(res => {
        this.setState({
          enableEdit: false
        });
      })
      .catch(err => console.log(err.response.data));
  };

  deleteData = _id => {
    this.deleteAllItem(this.props.match.params.id);
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/Orders/${_id}`)
      .then(res => {
        this.setState({
          link: true
        });
        console.log(this.state.dataOrderId.id);
      });
  };

  deleteAllItem = _id => {
    axios
      .delete(
        `https://purchasing-stagging.herokuapp.com/api/Orders/${_id}/items`
      )
      .then(res => {
        console.log("berhasil menghapus order");
      });
  };

  deleteDataItem = _id => {
    axios
      .delete(`https://purchasing-stagging.herokuapp.com/api/Items/${_id}`)
      .then(res => {
        console.log("Sukses");
        this.getDataOrderId();
        this.getDataById();
      });
  };

  gantiStatusACC1 = id => {
    axios
      .patch(`https://purchasing-stagging.herokuapp.com/api/Orders/${id}`, {
        status: 3
      })
      .then(res => {
        this.setState({
          link: true
        });
      })
      .catch(err => alert(` Error O' `));
  };

  gantiStatusPending = id => {
    axios
      .patch(`https://purchasing-stagging.herokuapp.com/api/Orders/${id}`, {
        status: 4
      })
      .then(res => {
        this.setState({
          link: true
        });
      })
      .catch(err => alert(` Error O' `));
  };

  gantiStatusRejected = id => {
    axios
      .patch(`https://purchasing-stagging.herokuapp.com/api/Orders/${id}`, {
        status: 5
      })
      .then(res => {
        this.setState({
          link: true
        });
      })
      .catch(err => alert(` Error O' `));
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

  handleChangeTable = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  componentDidMount() {
    this.getDataById();
    this.getDataOrderId();
    console.log(this.state.orderDetail);
    console.log(this.state.orderCode);
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div>
        <NavBar
          mode="dark"
          leftContent={[
            <Link to="/" style={{ color: "#ffffff" }}>
              Back
            </Link>
          ]}
          rightContent={[
            <Icon
              key="0"
              type="form"
              style={{ marginRight: "16px" }}
              onClick={() => {
                this.setState({
                  enableEdit: true
                });
              }}
            />,
            <Link
              to={{
                pathname: `/orderdetail/update/addnewbarang/${
                  this.props.match.params.id
                }`,
                state: {
                  orderId: this.state.id,
                  orderCode: this.state.orderCode
                }
              }}
            >
              <Icon key="1" type="plus" style={{ color: "#ffffff" }} />
            </Link>
          ]}
          onClick={() => console.log("")}
          style={{
            backgroundColor: "#872ef5",
            padding: "25px 0px 25px 0px"
          }}
        >
          <p style={{ marginTop: "20px" }}>ORDER DETAIL</p>
        </NavBar>

        <div style={{ textAlign: "center", margin: "20px" }}>
          <h1>Aplikasi Kasir</h1>
          <p>{this.state.dataOrderId.orderCode}</p>
        </div>

        <div>
          {this.state.enableEdit ? (
            <div>
              <Card
                style={{
                  background: "#fff",
                  padding: "35px",
                  borderRadius: "0px",
                  margin: "15px 15px 10px 15px"
                }}
              >
                <List>
                  <InputLabel htmlFor="demo-controlled-open-select">
                    Kategori
                  </InputLabel>
                  <Select
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.category}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "category",
                      id: "demo-controlled-open-select"
                    }}
                    style={{ width: "100%" }}
                    name="category"
                  >
                    <MenuItem value="" disabled>
                      <em>- Kategori -</em>
                    </MenuItem>
                    <MenuItem value="Elektronik">Elektronik</MenuItem>
                    <MenuItem value="Jasa/Tenaga borong">
                      Jasa/Tenaga borong
                    </MenuItem>
                    <MenuItem value="Material Bangunan">
                      Material Bangunan
                    </MenuItem>
                    <MenuItem value="Obat-obatan">Obat-obatan</MenuItem>
                    <MenuItem value="Pakan ternak">Pakan ternak</MenuItem>
                    <MenuItem value="Peralatan kerja">Peralatan kerja</MenuItem>
                    <MenuItem value="Perlengkapan satwa">
                      Perlengkapan satwa
                    </MenuItem>
                    <MenuItem value="Sparepart">Sparepart</MenuItem>
                    <MenuItem value="Service/Inventaris">
                      Service/Inventaris
                    </MenuItem>
                    <MenuItem value="Lain-lain">Lain-lain</MenuItem>
                  </Select>
                </List>
                <List>
                  <TextField
                    id="standard-name"
                    label="Catatan"
                    name="note"
                    width="100%"
                    style={{ width: "100%" }}
                    value={this.state.note}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </List>
                <h4 style={{ textAlign: "center" }}>
                  Total Harga :{" "}
                  <TextField
                    id="standard-name"
                    name="totalHarga"
                    value={this.state.totalHarga}
                    margin="normal"
                  />{" "}
                </h4>
                <h3>
                  <Icon
                    type="delete"
                    theme="outlined"
                    style={{ textAlign: "center", color: "#f0555a" }}
                    onClick={() => {
                      this.deleteData(this.props.match.params.id);
                    }}
                  />{" "}
                  Hapus Order
                </h3>
                <div style={{ margin: "20px 0px 0px 0px" }}>
                  <Button
                    onClick={() => {
                      this.gantiData(this.props.match.params.id);
                    }}
                    inline
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "#00ae69",
                      color: "#fff",
                      width: "100px",
                      textAlign: "center",
                      float: "left"
                    }}
                  >
                    SIMPAN
                  </Button>
                  <Button
                    onClick={() => {
                      this.setState({
                        enableEdit: false
                      });
                    }}
                    style={{
                      color: "#fff",
                      backgroundColor: "#f0555a",
                      textAlign: "center",
                      width: "80px",
                      borderRadius: "50px",
                      float: "right"
                    }}
                  >
                    BATAL
                  </Button>
                </div>
              </Card>
              {/* <List>
                <TextField
                disabled
                  id="standard-name"
                  label="Total Semua"
                  name="totalHarga"
                  width="100%"
                  style={{ width: "100%" }}
                  value={`Rp .${this.state.totalHarga}`}
                  margin="normal"
                />
              </List> */}
            </div>
          ) : (
            <div>
              <Card
                style={{
                  background: "#fff",
                  padding: "35px",
                  borderRadius: "0px",
                  margin: "15px 15px 10px 15px"
                }}
              >
                <List>
                  <InputLabel htmlFor="demo-controlled-open-select">
                    Kategori
                  </InputLabel>
                  <Select
                    disabled
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.category}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "category",
                      id: "demo-controlled-open-select"
                    }}
                    style={{ width: "100%" }}
                    name="category"
                  >
                    <MenuItem value="" disabled>
                      <em>- Kategori -</em>
                    </MenuItem>
                    <MenuItem value="Elektronik">Elektronik</MenuItem>
                    <MenuItem value="Jasa/Tenaga borong">
                      Jasa/Tenaga borong
                    </MenuItem>
                    <MenuItem value="Material Bangunan">
                      Material Bangunan
                    </MenuItem>
                    <MenuItem value="Obat-obatan">Obat-obatan</MenuItem>
                    <MenuItem value="Pakan ternak">Pakan ternak</MenuItem>
                    <MenuItem value="Peralatan kerja">Peralatan kerja</MenuItem>
                    <MenuItem value="Perlengkapan satwa">
                      Perlengkapan satwa
                    </MenuItem>
                    <MenuItem value="Sparepart">Sparepart</MenuItem>
                    <MenuItem value="Service/Inventaris">
                      Service/Inventaris
                    </MenuItem>
                    <MenuItem value="Lain-lain">Lain-lain</MenuItem>
                  </Select>
                </List>
                <List>
                  <TextField
                    disabled
                    id="standard-name"
                    label="Catatan"
                    name="note"
                    width="100%"
                    style={{ width: "100%" }}
                    value={this.state.note}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </List>
                <h4 style={{ textAlign: "center" }}>
                  Total Harga :{" "}
                  <TextField
                    id="standard-name"
                    name="totalHarga"
                    value={this.state.totalHarga}
                    margin="normal"
                  />{" "}
                </h4>
                <h3>
                  <Icon
                    type="delete"
                    theme="outlined"
                    style={{ textAlign: "center", color: "#f0555a" }}
                    onClick={() => {
                      this.deleteData(this.props.match.params.id);
                    }}
                  />{" "}
                  Hapus Order
                </h3>
              </Card>
              <br />
              {/* <List>
                <TextField
                  disabled
                  id="standard-name"
                  label="Total Semua"
                  name="totalHarga"
                  width="100%"
                  style={{ width: "100%" }}
                  value={`Rp .${this.state.totalHarga}`}
                  margin="normal"
                />
              </List>
               */}
            </div>
          )}
        </div>

        <div>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            Detail Barang
          </h3>
          {this.state.loading ? (
            this.state.orderDetail.map(key => {
              return (
                <div style={{ marginBottom: "5px" }}>
                  <ExpansionPanel
                    expanded={expanded === key.id}
                    onChange={this.handleChangeTable(key.id)}
                  >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        <h3>{key.name}</h3>
                      </Typography>
                      <Typography
                        style={{ float: "right" }}
                        className={classes.secondaryHeading}
                      >
                        {`Rp. ${key.total}`}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid item xs={12} md={6}>
                        <div>
                          <List>
                            <ListItem>
                              <ListItemText
                                primary={
                                  <h2 style={{ color: "#f0555a" }}>
                                    <Icon
                                      type="delete"
                                      theme="outlined"
                                      onClick={() => {
                                        this.deleteDataItem(key.id);
                                      }}
                                    />
                                  </h2>
                                }
                              />
                              <ListItemSecondaryAction>
                                <Link
                                  to={{
                                    pathname: `/orderdetail/update/${key.id}`,
                                    state: {
                                      orderId: this.state.id,
                                      orderCode: this.state.orderCode
                                    }
                                  }}
                                >
                                  <h2 style={{ color: "#00ae69" }}>
                                    <Icon type="edit" theme="outlined" />
                                  </h2>
                                </Link>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Merk" />
                              <ListItemSecondaryAction>
                                <h3>{key.merk}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Spesifikasi" />
                              <ListItemSecondaryAction>
                                <h3>{key.spec}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Merk" />
                              <ListItemSecondaryAction>
                                <h3>{key.merk}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Nama Toko" />
                              <ListItemSecondaryAction>
                                <h3>{key.store}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="No.Telephone" />
                              <ListItemSecondaryAction>
                                <h3>{key.telephone}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Harga" />
                              <ListItemSecondaryAction>
                                <h3>{key.unitPrice}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Jumlah" />
                              <ListItemSecondaryAction>
                                <h3>{key.count}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              <ListItemText primary="Total" />
                              <ListItemSecondaryAction>
                                <h3>{key.total}</h3>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </div>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              );
            })
          ) : (
            <h1 style={{ textAlign: "center" }}>
              Loading <Icon type="loading" theme="outlined" />
            </h1>
          )}
        </div>
      </div>
    );
  }
}

MyOrderDetail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyOrderDetail);
