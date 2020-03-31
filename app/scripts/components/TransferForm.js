import React from "react"
import { connect } from "react-redux";
import container from "../containers/all.js"
import postExpenseToDb from "../actions/postExpenseToDb.js";
import PropTypes from "prop-types";

class TransferForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      amount: "",
      event: "",
      postTime: Date.now()
    };
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeForm(e) {
    this.setState({ amount: e.target.value, postTime: Date.now() });
  }

  handleSubmit(e) {
    if (this.state) {
      this.props.dispatch(postExpenseToDb(this.state))
    } else
      alert("You're missing either a name, amount, or description");
    e.preventDefault();
  }

  render() {
    return (<div className="trasnfer-form-container">
      <form onSubmit={this.handleSubmit}><input className="expense-form" type="text" placeholder=" Chips "
                                                value={this.state.amount} onChange={this.handleChangeForm} /></form>
      <button className="btn btn-default submit-btn" onClick={this.handleSubmit}>Submit</button>
    </div>);
  }
}

TransferForm.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(container.allState)(TransferForm)
