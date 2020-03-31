import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"
import ExpenseForm from "./ExpenseForm.js"

class Expenses extends React.Component {


  render() {
    return (
      <div className="ExpensesContainer Component">
        <h3>Expenses</h3>
        <ExpenseForm />
        <Link to="/expense-history">See All Expenses</Link>
      </div>
    );
  }
}

export default connect(container.allState)(Expenses)
