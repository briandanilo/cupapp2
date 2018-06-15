import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import postExpenseToDb from '../actions/postExpenseToDb.js';

class ExpenseForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        amount: '',
        description: '',
        user:'',
        postTime: Date.now()
      };
      this.handleChangeAmount = this.handleChangeAmount.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    componentWillMount(){
      var route = window.location.pathname
      route = route.substring(1,route.length)
      if (route) {
        console.log("we got a route!")
      }
    }

    handleChangeAmount(e) {
      this.setState({amount: e.target.value, postTime: Date.now()});
    }
    handleChangeDescription(e) {
      this.setState({description: e.target.value, postTime: Date.now()});
    }
    handleChangeUser(e) {
      this.setState({user: e.target.value, postTime: Date.now()});
    }

    handleSubmit(e) {
      if (this.state.amount && this.state.user && this.state.description && this.state.postTime){
        this.props.dispatch(postExpenseToDb(this.state))
        this.setState({
          amount: '',
          description: '',
          user:'',
          postTime: Date.now()
        })
      }
      else
        alert("You're missing either a name, amount, or description")
      e.preventDefault();
    }

    render(props) {
      return (<div className="expense-form-container">
          <label>
            <input className="expense-form" type="text" placeholder=" Your Name" value={this.state.user} onChange={this.handleChangeUser} />
          </label><br/>
          <label>
            <input className="expense-form"  type="number" placeholder=" Amount Spent" value={this.state.amount} onChange={this.handleChangeAmount} />
          </label><br/>
          <label>
            <input className="expense-form"  type="text" placeholder=" Activity Enjoyed" value={this.state.description} onChange={this.handleChangeDescription} />
          </label>
        <button className="btn btn-default submit-btn" onClick={this.handleSubmit}>Submit</button>
      </div>);
    }
}
export default connect(container.allState)(ExpenseForm)
