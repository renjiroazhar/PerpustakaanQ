import React, { Component } from "react";
import {
    Icon,
    Table,
} from "antd";
import { List } from "antd-mobile";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";

class HistoryTahunan extends Component {

    state = {
        loading: false,
    }

    handleChangesOptionTahun = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.setState({
            tahun: e.target.value,
            namaTahun: e.target.value
        });
        console.log(this.state);
        this.getDataTahunan(e.target.value);
    };

    render() {

        const columns = [
            {
                title: "No",
                width: 52,
                dataIndex: "no",
                key: "no",
                fixed: "left"
            },
            {
                title: "Nama siswa",
                width: 125,
                dataIndex: "student",
                key: "student",
                fixed: "left"
            },
            {
                title: "Nama Buku",
                width: 125,
                dataIndex: "bookname",
                key: "bookname",
                fixed: "left"
            },
            {
                title: "No Buku",
                dataIndex: "booknumber",
                key: "booknumber"
            },
            {
                title: "Penerbit",
                dataIndex: "publisher",
                key: "publisher"
            },
            {
                title: "Jumlah Buku",
                dataIndex: "count",
                key: "count"
            },
            {
                title: "NIS",
                dataIndex: "nis",
                key: "nis"
            },
            {
                title: "Kelas",
                dataIndex: "class",
                key: "class"
            },
            {
                title: "Jurusan",
                dataIndex: "vocation",
                key: "vocation"
            },
            {
                title: "Tanggal Pinjam",
                dataIndex: "dateOfLoan",
                key: "dateOfLoan"
            },
            {
                title: "Tanggal Kembali",
                dataIndex: "dateOfReturn",
                key: "dateOfReturn"
            },
        ];

        return (
            <div>
                <form>
                    <h4 style={{ margin: "0px 10px 0px 10px" }}>Pilih Tahun</h4>
                    <List>
                        <Select
                            value={this.state.tahun}
                            onChange={this.handleChangesOptionTahun}
                            inputProps={{
                                name: "tahun",
                                id: "age-simple"
                            }}
                            style={{ width: "100%" }}
                            name="tahun"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={0}>- Tahun -</MenuItem>
                            <MenuItem value={2018}>2018</MenuItem>
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                            <MenuItem value={2021}>2021</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                            <MenuItem value={2025}>2025</MenuItem>
                            <MenuItem value={2026}>2026</MenuItem>
                            <MenuItem value={2027}>2027</MenuItem>
                            <MenuItem value={2028}>2028</MenuItem>
                            <MenuItem value={2029}>2029</MenuItem>
                        </Select>
                    </List>
                    <br />
                </form>
                <div style={{ marginTop: "10px" }}>
                    {this.state.loading ? (
                        <Table
                            columns={columns}
                            dataSource={this.state.orderDetail}
                            scroll={{ x: 1500 }}
                        />
                    ) : (
                            <h1 style={{ textAlign: "center" }}>
                                Loading <Icon type="loading" theme="outlined" />
                            </h1>
                        )}
                    {this.state.link ? <Redirect to="/" /> : ""}
                </div>
            </div>
        );
    }
}

export default HistoryTahunan;