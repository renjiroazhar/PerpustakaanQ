import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import "./style/style.css";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logoPerpus from './logo/logoPerpustakaanQ.png';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 120,
    marginRight: "30px"
  },
  selectEmptyOne: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    justifyContent: 'flex-start'
  },
  selectEmptyTwo: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    justifyContent: 'flex-end'
  },
});

class SideBar extends Component {
  state = {
    collapsed: false,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Sider
          style={{
            background: "#f7f7f7",
            height: "100%"
          }}
        >
          {!this.state.collapsed && (
            <div style={{ textAlign: 'center', margin: '17px' }}>
              <img height="20px" width="150px" src={logoPerpus} alt="PerpustakaanQ Logo" />
            </div>
          )}
          {this.state.collapsed && (
            <h3 align="center" style={{ margin: 16, color: "#872ef5" }}>
              PA
          </h3>
          )}

          <Button
            style={{
              margin: 16,
              backgroundColor: "#00ae69",
              width: "80%",
              borderColor: "transparent",
              borderRadius: '3px'
            }}
            type="primary"
            icon="plus"
            size="large"
            onClick={this.handleClickOpen}
          >
            Pinjam Buku
            </Button>


          <Menu
            theme="light"
            style={{
              background: "#f7f7f7"
            }}
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="bars" theme="outlined" />
                <span>Beranda</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="clock-circle" />
                  <span>Riwayat Pinjam</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to="/borrow_history/monthly">
                  Bulanan
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/borrow_history/yearly">
                  Tahunan
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Link to={"/account"}>
                <Icon type="user" />
                <span>Akun</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Biodata Peminjam</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send
                updates occasionally.
            </DialogContentText>
              <FormControl required className={classes.formControl}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nama Siswa"
                  type="name"
                  fullWidth
                />
              </FormControl>
              <FormControl required className={classes.formControl}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="NIS"
                  type="number"
                  fullWidth
                />
              </FormControl>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Kelas</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  name="age"
                  inputProps={{
                    id: 'age-required',
                  }}
                  className={classes.selectEmptyOne}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="age-required">Jurusan</InputLabel>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  name="age"
                  inputProps={{
                    id: 'age-required',
                  }}
                  className={classes.selectEmptyTwo}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl required className={classes.formControl}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Judul Buku"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl required className={classes.formControl}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Penerbit"
                  type="text"
                  fullWidth
                />
              </FormControl>
              <FormControl required className={classes.formControl}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Tahun Terbit"
                  type="number"
                  fullWidth
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} type="danger">
                Batal
            </Button>
              <Button onClick={this.handleClose} type="primary">
                Tambahkan
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);