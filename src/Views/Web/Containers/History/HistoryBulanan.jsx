import React, { Component } from "react";
import {
    Icon,
    Table,
} from "antd";
import { List } from "antd-mobile";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Redirect } from "react-router-dom";

class HistoryBulanan extends Component {

    state = {
        loading: false
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
                    <h4 style={{ margin: "0px 10px 0px 10px" }}>Pilih Bulan</h4>
                    <List>
                        <Select
                            value={this.state.history}
                            onChange={this.handleChangesOptionHistory}
                            inputProps={{
                                name: "history",
                                id: "age-simple"
                            }}
                            style={{ width: "100%" }}
                            name="history"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Januari">Januari</MenuItem>
                            <MenuItem value="Februari">Februari</MenuItem>
                            <MenuItem value="Maret">Maret</MenuItem>
                            <MenuItem value="April">April</MenuItem>
                            <MenuItem value="Mei">Mei</MenuItem>
                            <MenuItem value="Juni">Juni</MenuItem>
                            <MenuItem value="Juli">Juli</MenuItem>
                            <MenuItem value="Agustus">Agustus</MenuItem>
                            <MenuItem value="September">September</MenuItem>
                            <MenuItem value="Oktober">Oktober</MenuItem>
                            <MenuItem value="November">November</MenuItem>
                            <MenuItem value="Desember">Desember</MenuItem>
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

export default HistoryBulanan;