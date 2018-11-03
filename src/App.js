import React, { Component } from 'react';
import LoginPage from "./Loginpage/LoginPage";
import MobileApp from './Routes/MobileApp';
import WebApp from './Routes/MobileApp';
import { isMobile } from "react-device-detect";
class App extends Component {
  state = {
    login: null
  }

  updateLogin = () => {
    this.setState({
      login: true
    })
  }

  updateLogout = () => {
    this.setState({
      login: false
    })
  }

  render() {

    if (!(sessionStorage.getItem('loginState'))) {
      return <LoginPage updateLogin={
        this.updateLogin
      }
      />;
    }

    if (isMobile) {
      return <MobileApp updateLogout={
        this.updateLogout
      }
      />;
    }

    return <WebApp updateLogout={
      this.updateLogout
    }
    />;
  }
}

export default App;
