import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'

class ExpenseForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        amount: '',
        description: ''
      };
      this.handleChangeAmount = this.handleChangeAmount.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeAmount(e) {
      this.setState({amount: e.target.value});
    }
    handleChangeDescription(e) {
      this.setState({description: e.target.value});
    }

    handleSubmit(e) {
      alert('An expense was submitted: ' + this.state.amount + ' for ' + this.state.description);
      e.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            $$$: <input type="number" placeholder=" Amount Spent" value={this.state.amount} onChange={this.handleChangeAmount} />
          </label><br/>
          <label>
            For: <input type="text" placeholder=" Activity Enjoyed" value={this.state.description} onChange={this.handleChangeDescription} />
          </label><br/><br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}
export default connect(container.allState)(ExpenseForm)
