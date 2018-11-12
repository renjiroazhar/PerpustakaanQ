import React, { Component } from "react";
import {
    Table,
    Col,
    Select,
    Input,
    Icon
} from "antd";
import { Redirect } from "react-router-dom";
import axios from "axios";

const InputGroup = Input.Group;
const Option = Select.Option;

class HistoryBulanan extends Component {
    rootSubmenuKeys = ["sub1", "sub2", "sub4"];

    state = {
        openKeys: ["sub1"],
        data: [],
        history: "",
        totalEstimasiSemua: 0,
        totalEstimasiPerbulan: [],
        namaBulan: "",
        loading: false,
        year: 0
    };

    getDataBulanan = (awaltanggal, akhirtanggal, bulanan, tahunan) => {
        axios
            .get(
                `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"items","where":{"and":[{"createdAt":{"gt":"${tahunan}-${bulanan}-${awaltanggal}"}},{"createdAt":{"lt":"${tahunan}-${bulanan}-${akhirtanggal}"}}],"status":"1"}}`
            )
            .then(res => {
                this.setState({
                    data: res.data,

                });
                console.log(res.data);
                let temp = 0;
                this.state.data.map(key => temp += key.totalHarga);
                this.setState({
                    totalEstimasiSemua: temp,
                    loading: true
                });
            });
    };

    getDataBulanSekarang = () => {
        let today = new Date();
        let todayMonth = today.getMonth() + 1;
        let todayYear = today.getFullYear();
        var d = new Date();
        var monthNames = ["Januari", "February", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        var todayMonthName = monthNames[d.getMonth()]
        console.log(todayMonthName);
        axios
            .get(
                `https://purchasing-stagging.herokuapp.com/api/Orders?filter={"include":"people","where":{"and":[{"createdAt":{"gt":"${todayYear}-${todayMonth}-1"}},{"createdAt":{"lt":"${todayYear}-${todayMonth}-31"}}],"status":"1"}}`
            )
            .then(res => {
                this.setState({
                    data: res.data,

                });
                console.log(res.data);
                let temp = 0;
                this.state.data.map(key => temp += key.totalHarga);
                this.setState({
                    totalEstimasiSemua: temp,
                    namaBulan: todayMonthName
                });
            });
    };


    deleteData = _id => {
        axios
            .delete(`https://purchasing-stagging.herokuapp.com/api/Orders/${_id}`)
            .then(res => {
                this.getData();
            });
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };


    handleChangesOptionHistory = value => {
        let januari = [1, 31];
        let februari = [1, 29];
        let maret = [1, 31];
        let april = [1, 30];
        let mei = [1, 31];
        let juni = [1, 30];
        let july = [1, 31];
        let agustus = [1, 31];
        let september = [1, 30];
        let oktober = [1, 31];
        let november = [1, 30];
        let desember = [1, 31];

        // let tahun = date.getFullYear();
        // this.setState({
        //   year :  tahun
        // })

        if (value === "Januari") {
            this.getDataBulanan(januari[0], januari[1], 1, this.state.year);
            this.setState({
                namaBulan: "Januari"
            });
        } else if (value === "Februari") {
            this.getDataBulanan(februari[0], februari[1], 2, this.state.year);
            this.setState({
                namaBulan: "Februari"
            });
        } else if (value === "Maret") {
            this.getDataBulanan(maret[0], maret[1], 3, this.state.year);
            this.setState({
                namaBulan: "Maret"
            });
        } else if (value === "April") {
            this.getDataBulanan(april[0], april[1], 4, this.state.year);
            this.setState({
                namaBulan: "April"
            });
        } else if (value === "Mei") {
            this.getDataBulanan(mei[0], mei[1], 5, this.state.year);
            this.setState({
                namaBulan: "Mei"
            });
        } else if (value === "Juni") {
            this.getDataBulanan(juni[0], juni[1], 6, this.state.year);
            this.setState({
                namaBulan: "Juni"
            });
        } else if (value === "Juli") {
            this.getDataBulanan(july[0], july[1], 7, this.state.year);
            this.setState({
                namaBulan: "Juli"
            });
        } else if (value === "Agustus") {
            this.getDataBulanan(agustus[0], agustus[1], 8, this.state.year);
            this.setState({
                namaBulan: "Agustus"
            });
        } else if (value === "September") {
            this.getDataBulanan(september[0], september[1], 9, this.state.year);
            this.setState({
                namaBulan: "September"
            });
        } else if (value === "Oktober") {
            this.getDataBulanan(oktober[0], oktober[1], 10, this.state.year);
            this.setState({
                namaBulan: "Oktober"
            });
        } else if (value === "November") {
            this.getDataBulanan(november[0], november[1], 11, this.state.year);
            this.setState({
                namaBulan: "November"
            });
        } else if (value === "Desember") {
            this.getDataBulanan(desember[0], desember[1], 12, this.state.year);
            this.setState({
                namaBulan: "Desember"
            });
        }


        this.setState({ history: value });


        console.log(this.state);
    };

    handleChangeHistoryYear = (value) => {
        this.setState({
            year: value
        })
        console.log(this.state);
    }



    componentDidMount() {
        this.getDataBulanan();
        this.getDataBulanSekarang();
    }

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
                <InputGroup
                    style={{ background: "#f7f7f7", padding: "35px" }}
                    size="large"
                >
                    <Col span={6} style={{ marginRight: "40px", width: "47%" }}>
                        <h5 align="left" style={{ marginBottom: "10px" }}>
                            Tahun
            </h5>
                        <Select
                            name="year"
                            defaultValue="Tahun"
                            value={this.state.year}
                            onChange={this.handleChangeHistoryYear}
                            style={{ width: "450px" }}
                        >
                            <Option value={0}>
                                <em>-Silakan Tentukan Tahun Terlebih Dahulu-</em>
                            </Option>
                            <Option value={2017}>2017</Option>
                            <Option value={2018}>2018</Option>
                            <Option value={2019}>2019</Option>
                            <Option value={2020}>2020</Option>
                            <Option value={2021}>2021</Option>
                            <Option value={2022}>2022</Option>
                            <Option value={2023}>2023</Option>
                            <Option value={2024}>2024</Option>
                            <Option value={2025}>2025</Option>
                            <Option value={2026}>2026</Option>
                            <Option value={2027}>2027</Option>
                            <Option value={2028}>2028</Option>
                        </Select>
                    </Col>
                    <Col span={6} style={{ width: "47%" }}>
                        <h5 align="left" style={{ marginBottom: "10px" }}>
                            Bulan
            </h5>
                        <Select
                            defaultValue=""
                            name="year"
                            style={{ width: "450px" }}
                            value={this.state.history}
                            onChange={this.handleChangesOptionHistory}
                        >
                            <Option value="">
                                <em>-Silakan Tentukan Bulan Terlebih Dahulu-</em>
                            </Option>
                            <Option value="Januari">Januari</Option>
                            <Option value="Februari">Februari</Option>
                            <Option value="Maret">Maret</Option>
                            <Option value="April">April</Option>
                            <Option value="Mei">Mei</Option>
                            <Option value="Juni">Juni</Option>
                            <Option value="Juli">Juli</Option>
                            <Option value="Agustus">Agustus</Option>
                            <Option value="September">September</Option>
                            <Option value="Oktober">Oktober</Option>
                            <Option value="November">November</Option>
                            <Option value="Desember">Desember</Option>
                        </Select>
                    </Col>
                </InputGroup>

                <div style={{ marginTop: "10px" }}>
                    {this.state.loading ? (
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            onChange={onChange}
                            scroll={{ x: 1500 }}
                        />
                    ) : (
                            <h1 style={{ textAlign: "center" }}>
                                Loading <Icon type="loading" theme="outlined" />
                            </h1>
                        )}
                    {this.state.link ? <Redirect to="/" /> : ""}
                </div>
            </div >
        );
    }
}

export default HistoryBulanan;

function onChange(pagination, filters, sorter) {
    console.log("params", pagination, filters, sorter);
}