import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import container from '../containers/all.js'
//import callGoogleApi from '../actions/googleApi.js'
import ExpenseForm from './ExpenseForm.js'

class Expenses extends React.Component {


  displayExpenses(){
    if (this.props.expenses)
    return this.props.expenses.map((i)=>{
      console.log(" i ",i[0])
      return <a href="#" className="list-group-item">{i[0]}</a>
    })
  }

  render () {
    return (
      <div>
        <h3>New Expense</h3>
        <div className="list-group">
          {this.displayExpenses()}
        </div>
        <ExpenseForm />
        <Link to="/expense-history">See All Expenses</Link>
      </div>
    );
  }
}
export default connect(container.allState)(Expenses)
