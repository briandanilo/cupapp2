import React from 'react'
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import container from '../containers/all.js'
import callGoogleApi from '../actions/googleApi.js'
import TransferForm from './TransferForm.js'
import pins from '../pins.js'
import postChipBetToDb from '../actions/postChipBetToDb.js';

class Transfer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      user:"",
      verifiedUser:"",
      transferee:"",
      amount:"",
      postTime:""
    }
    this.cuppers = ["fowler","kahl","danilo","joe","wu","jay","adam","jim","barnes","rick","eph","ben","dave","baron","spike","pete"]
    this.getKeyByValue = this.getKeyByValue.bind(this);
    this.handleSubmitTransfer = this.handleSubmitTransfer.bind(this);
    this.handleChangeTransferee = this.handleChangeTransferee.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.cancelTransfer = this.cancelTransfer.bind(this);
    this.showTransferFrom = this.showTransferFrom.bind(this);
    this.renderPinForm = this.renderPinForm.bind(this)
  }

  componentWillMount(){

  }

  renderPinForm(){
    if (!this.state.verifiedUser)
      return (<div><label><input className="transfer-form"  type="number" placeholder=" Your Pin " value={this.state.user} onChange={this.handleChangeUser} />
        </label><br/></div>)
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] == value);
  }

  showTransferFrom(){
    if (this.state.verifiedUser && this.props.chipCounts){
      let chipCounts = this.props.chipCounts
      return <p>From: {this.state.verifiedUser} (Chip Count: {chipCounts[this.state.verifiedUser].chipCount})</p>
    }
  }

  cancelTransfer(){
    this.setState({ user:"", verifiedUser:"", amount: "", transferee:"" });
  }

  handleChangeAmount(e){
    this.setState({ amount: Number(e.target.value), postTime: Date.now() });
    e.preventDefault();
  }
  handleChangeUser(e){
    this.setState({ user: e.target.value });
    var userByName = this.getKeyByValue(pins,e.target.value)
    if (userByName)
      this.setState({ verifiedUser: userByName });
    e.preventDefault();
  }
  handleChangeTransferee(e){
    this.setState({ transferee: e.target.id });
    e.preventDefault();
  }

  handleSubmitTransfer(e) {
    var sufficientBalance = false;
    if (this.props.chipCounts)
      if (this.props.chipCounts[this.state.verifiedUser].chipCount >= this.state.amount)
        sufficientBalance = true
    if (sufficientBalance && this.state.verifiedUser && this.state.transferee && (this.state.amount>0) && this.state.user){
      this.props.dispatch(postChipBetToDb(this.state))
      this.setState({
        user:"",
        verifiedUser:"",
        transferee:"",
        amount:0,
        postTime: ""
      })
    }
    else
      alert("You're doing something incorrect or shady (eph)")
    e.preventDefault();
  }

  displayCuppers(){
    if (!this.state.transferee){
      return this.cuppers.map((i)=>{
        return <button id={i} className="btn btn-default transfer-to" onClick={this.handleChangeTransferee}>{i}</button>
      })
    } else {
      return (<div>
        <p>Transfer to: {this.state.transferee} {this.showTransferFrom()}</p><br/>
        {this.renderPinForm()}
        <label><input className="transfer-form"  type="number" placeholder=" Chips " value={this.state.amount} onChange={this.handleChangeAmount} /></label>
        <button className="btn btn-default submit-btn" onClick={this.handleSubmitTransfer}>Submit</button>
      </div>)
    }
  }

  renderCancelButton(){
    if (this.state.transferee || this.state.amount){
      return (<div><a className="" onClick={this.cancelTransfer}>Reset Form</a><br/></div>)
    } else
      return null
  }

  render () {
    return (<div className="Component">
        <h3>Transfer Chips To:</h3>
        <div className="transfer-button-container">
          {this.displayCuppers()}
        </div>
          {this.renderCancelButton()}
          <Link to="/chip-history">See All Chip Bets</Link>
    </div>);
  }
}
export default connect(container.allState)(Transfer)
