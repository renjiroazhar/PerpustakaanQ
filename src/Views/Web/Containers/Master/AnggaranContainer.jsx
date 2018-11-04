import React, { Component } from "react";
import "./style/Anggaran.css";
import historybulanan from "./image/historyBulanan.png";
import historytahunan from "./image/tahunan.png";
import { Link } from "react-router-dom";

class AnggaranContainer extends Component {
  render() {
    return (
      <div className="container">
        <Link to={`/order_history/monthly`}>
          <div className="bg">
            <Link to={`/order_history/monthly`}>
              <img src={historybulanan} alt="" />
              <div className="overlay">
                <h1 style={{ color: "#00ae69" }}>HISTORY BULANAN </h1>
                <h3>Cek Semua Estimasi Tiap Bulan.</h3>
              </div>
            </Link>
          </div>
        </Link>

        <Link to={`/order_history/yearly`}>
          <div className="bg">
            <img src={historytahunan} alt="" />
            <Link to={`/order_history/yearly`}>
              <div className="overlay">
                <h1 style={{ color: "#00ae69" }}>HISTORY TAHUNAN </h1>
                <h3>Cek Semua Estimasi Tiap Tahun.</h3>
              </div>
            </Link>
          </div>
        </Link>
      </div>
    );
  }
}

export default AnggaranContainer;
