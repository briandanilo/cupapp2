import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import Transfer from "./Transfer.js";
import Scorecard from "./Scorecard.js";
import Expenses from "./Expenses.js";
import Schedule from "./Schedule.js";
import ExpenseHistory from "./ExpenseHistory.js";
import Tools from "./Tools.js";
import readExpenseHistory from '../actions/readExpenseHistory'
import readChipBetHistory from '../actions/readChipBetHistory'
import container from '../containers/all.js'

class AppRoot extends React.Component {

  componentWillMount(){
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

export default connect(container.allState)(AppRoot)
