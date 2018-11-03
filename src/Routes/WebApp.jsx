import React, { Component } from 'react';
import { Layout, Input } from 'antd';
import SideBar from '../Views/Web/Components/SideBar';
import HeaderComps from '../Views/Web/Components/HeaderComps';
import { Route } from 'react-router-dom';
import LoginPage from '../Loginpage';

const { Header, Content } = Layout;

// const loading  = () => <h1>Loading</h1>; 

// const LoginPage = Loadable({
//   loader: () => import('../Loginpage'),
//   loading: loading,
// });

export default class WebApp extends Component {

    render() {
        return (
          <Layout style={{ background: "#fff", minHeight: "100vh" }}>
            <SideBar />
            <Layout>
              <Header>
                <HeaderComps />
              </Header>
              <Content style={{ background: "#fff" }}>
                <div
                  style={{
                    marginLeft: 24,
                    marginRight: 24,
                    padding: 24,
                    background: "#fff",
                    minHeight: 360
                  }}
                >
                  <Route exact path="/" component={LoginPage} />
              
                </div>
              </Content>
            </Layout>
          </Layout>
        );
      }
}
