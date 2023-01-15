import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "../../Components/Navbar";
import { Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import {
  withStyles,
} from "@material-ui/core/styles";
import Denda from './Denda/DendaContainer';
import Dipinjam from './Dipinjam/DipinjamContainer';
import { Link } from 'react-router-dom';

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
  { title: "Dipinjam" },
  { title: "Denda" }
];

const styles = theme => ({
  absolute: {
    color: "#ff6600",
    backgroundColor: "#ff6600",
    position: 'fixed',
    right: '0px',
    bottom: '0px',
    marginBottom: '80px',
    marginRight: '24px',
    "&:hover": {
      backgroundColor: "#ff6600",
    }
  },
  iconchat: {
    color: "#fff",
  },
});

class HomeContainer extends Component {
  state = {
    openKeys: ["sub1"],
    data: [],
    loading: false
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <StickyContainer>
          <Tabs tabs={tabs} initalPage={"t2"} renderTabBar={renderTabBar}>
            <div>
              <Dipinjam />
            </div>
            <div>
              <Denda />
            </div>
          </Tabs>
        </StickyContainer>
        <div>
          <Link to="/add_order">
            <Button variant="fab" className={classes.absolute}>
              <Add className={classes.iconchat} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContainer);