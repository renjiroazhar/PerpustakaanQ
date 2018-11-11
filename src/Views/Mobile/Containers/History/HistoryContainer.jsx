import React, { Component } from "react";
import Navbar from "../Home/Navbar";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { Icon } from "antd";
import MonthlyContainer from './HistoryBulanan';
import YearlyContainer from './HistoryTahunan';

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => (
        <div style={{ ...style, zIndex: 1 }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  );
}
const tabs = [
  {
    title: (
      <p style={{ fontSize: "15px", marginTop: "5px" }}>
        <Icon type="calendar" /> Bulanan{" "}
      </p>
    )
  },
  { title: "Tahunan" }
];

class HistoryContainer extends Component {
  state = {
    openKeys: ["sub1"],
    data: [],
    dataTahun: [],
    history: "",
    totalEstimasiSemua: 0,
    totalEstimasiPerbulan: [],
    namaBulan: "",
    namaTahun: 0,
    tahun: "",
    loading: false
  };

  render() {
    return (
      <div>
        <Navbar />
        <StickyContainer>
          <Tabs tabs={tabs} initalPage={"t2"} renderTabBar={renderTabBar}>
            <div>
            <MonthlyContainer />
            </div>
            <div>
              <YearlyContainer />
            </div>
          </Tabs>
        </StickyContainer>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default HistoryContainer;