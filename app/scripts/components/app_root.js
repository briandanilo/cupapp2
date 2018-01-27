import React from "react";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import Transfer from "./Transfer.js";
import Scorecard from "./Scorecard.js";
import Expenses from "./Expenses.js";
import ExpenseHistory from "./ExpenseHistory.js";
import readExpenseHistory from '../actions/readExpenseHistory'
import container from '../containers/all.js'


class AppRoot extends React.Component {

  render() {
    return (
      <div>
        <Scorecard />
        <Expenses />
      </div>
    );
  }
}

export default connect(container.allState)(AppRoot)
