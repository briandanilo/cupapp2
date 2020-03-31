import React from "react";
import { connect } from "react-redux";
import Transfer from "./Transfer.js";
import Scorecard from "./Scorecard.js";
import Expenses from "./Expenses.js";
import Schedule from "./Schedule.js";
import Tools from "./Tools.js";
import readChipBetHistory from '../actions/readChipBetHistory'
import container from '../containers/all.js'
import PropTypes from "prop-types";

class AppRoot extends React.Component {

  componentDidMount(){
    this.props.dispatch(readChipBetHistory())
  }
  
  render() {
    return (
      <div>
        <Scorecard />
        <Transfer />
        <Expenses />
        <Schedule />
        <Tools />
      </div>
    );
  }
}

AppRoot.propTypes = {
  dispatch: PropTypes.func,
};


export default connect(container.allState)(AppRoot)
