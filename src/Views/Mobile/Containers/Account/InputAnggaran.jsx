import React, { Component } from 'react'
import { NavBar, Card, List, Button } from 'antd-mobile';
import Cancel from "./svg/cancel.svg";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";


export default class InputAnggaran extends Component {

    state = {
        totalAnggaran: 0,
    }

    inputAnggaran = () => {
        axios.patch("https://purchasing-stagging.herokuapp.com/api/Anggarans/5bbb2b7cf48e2928821bcae0",
            {
                totalAnggaran: this.state.totalAnggaran
            }).then(res => {
                this.setState({
                    totalAnggaran: 0
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Link to={`/account/`}>
                        <img
                            src={Cancel}
                            height="20px"
                            width="20px"
                            alt="Currency free icon"
                            title="Currency free icon"
                        // selected={this.props.selectedTab === "account"}
                        // onClick={() => { this.props.onChangeTab('account') }}
                        /></Link>
                    }
                    onClick={() => console.log('')}
                    style={{ backgroundColor: "#872ef5", padding: '25px 0px 25px 0px' }}
                >
                    <p style={{ color: '#fff', marginTop: '17px' }}>INPUT ANGGARAN</p>
                </NavBar>

                <div style={{ margin: '15px' }}>
                    <Card style={{ background: "#fff", padding: "35px", borderRadius: '0px', border: '3px (#000)' }}>
                        <List>
                            <TextField
                                id="standard-name"
                                label="Input Anggaran"
                                name="totalAnggaran"
                                type="number"
                                value={this.state.totalAnggaran}
                                width="100%"
                                style={{ width: "100%" }}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </List>
                    </Card>
                </div>

                <center>
                    <Button
                        onClick={() => this.inputAnggaran}
                        iinline
                        style={{
                            borderRadius: "50px",
                            backgroundColor: "#00ae69",
                            color: "#fff",
                            width: "90%",
                        }}
                    >
                        SUBMIT
                    </Button>
                    {this.state.link ? (<Redirect to="/account" />) : ("")}
                </center>

            </div>
        )
    }
}