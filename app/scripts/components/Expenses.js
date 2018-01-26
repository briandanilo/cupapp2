import React from 'react'
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
    //if (!this.props.expenses)
    //  this.props.dispatch(callGoogleApi("cuppers"))
    return (
      <main>
        <h3>Expenses</h3>
        <div className="list-group">
          {this.displayExpenses()}
        </div>
        <ExpenseForm />
      </main>
    );
  }
}
export default connect(container.allState)(Expenses)
