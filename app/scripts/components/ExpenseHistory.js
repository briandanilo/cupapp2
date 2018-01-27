import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import readExpenseHistory from '../actions/readExpenseHistory.js';

class ExpenseHistory extends React.Component {

  constructor(props) {
      super(props);
  }

  componentWillMount(){
    this.props.dispatch(readExpenseHistory())
  }

  renderHistory(){
    if (this.props.expenseHistory){
      var history = Array.from(this.props.expenseHistory)
        .sort( (a,b) => {
        return a.postTime > b.startTime ? -1 : 1; // ascending order
      })
      return (
        history.map((i)=>{
          return (<p>{i.user} paid {i.amount} for {i.description}</p>)
        })
      )
    }
  }

  render(props) {
    return (<div>
        <Link to="/">Back to Homepage</Link>
        <h3>Expense History</h3>
        {this.renderHistory()}
      </div>)
  }

}
export default connect(container.allState)(ExpenseHistory)
