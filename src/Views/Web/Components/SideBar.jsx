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

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

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
    return (
      <div>
      <Sider
        style={{
          background: "#f7f7f7"
        }}
      >
        {!this.state.collapsed && (
          <h2 align="center" className="judul" style={{ margin: 16, color: "#872ef5", fontWeight: 'bold' }}>
           PerpustakaanQ
          </h2>
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
                borderRadius : '3px'
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
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
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

export default SideBar;