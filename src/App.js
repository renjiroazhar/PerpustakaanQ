import React, {
  Component
} from 'react';
import './App.css';
import {
  notification
} from "antd";
import {
  isMobile
} from "react-device-detect";
import {
  MobileApp,
  WebApp
} from './Routes';
import WrappedNormalLoginForm from './Views/Loginpage';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Login Berhasil',
    // description: '',
  });
};

class App extends Component {

  state = {
    login: null,
    hasToken : null
    // isLoading: true
  }

  updateLoginState = () => {
    sessionStorage.setItem('loginState', true)
    this.setState({
      login: true
    })
    openNotificationWithIcon('success')
  }

 
  updateLogoutState = () => {
    sessionStorage.clear();
    console.log("Logout...")
    this.setState({
      login: false
    })
  }

 
  

  render() {
  
    if (!(sessionStorage.getItem('loginState'))) {
      return <WrappedNormalLoginForm updateLogin = {
        this.updateLoginState
      }
      />;
    }

    if (isMobile) {
      return <MobileApp updateLogout = {
        this.updateLogoutState
      }
      />;
    }

    return <WebApp updateLogout = {
      this.updateLogoutState
    }
    />;

  }
}

export default App;