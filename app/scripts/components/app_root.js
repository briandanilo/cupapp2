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

  cupTrivia(){
    var triviaArray = [
      "winter is the coldest season",
      "coupe is french for 'cup'",
      "richard nixon died in the shower"
    ]
    var rand = Math.floor(Math.random()*triviaArray.length)
    fetch('http://jservice.io/api/random')
    alert("did you know that..."+triviaArray[rand])
  }

  coinflip(){
    (Math.random() > .5) ? alert("heads") : alert("tails")
  }

  jeopardy() {
  return fetch('http://jservice.io/api/random')
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson)
      alert(resJson[0].question)
    })
    .catch((error) => {
      console.error(error);
    });
}

  render() {
    return (
      <div>
        <Scorecard />
        <Expenses /><br/>
        <button className="cupTriviaBtn" onClick={this.jeopardy}>Jeopardy</button>
        <button className="cupTriviaBtn" onClick={this.cupTrivia}>Cup Trivia</button>
        <button className="cupTriviaBtn" onClick={this.coinflip}>Coinflip</button>
      </div>
    );
  }
}

export default connect(container.allState)(AppRoot)
