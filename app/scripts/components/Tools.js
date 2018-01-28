import React from 'react'
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js'

class Tools extends React.Component {

  constructor (props) {
    super(props);
    this.state = {}
  }

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


  render () {
    return (<div className="ToolsContainer Component">
      <h3>Tools</h3>
    <button className="cupTriviaBtn" onClick={this.jeopardy}>Jeopardy</button>
    <button className="cupTriviaBtn" onClick={this.cupTrivia}>Cup Trivia</button>
    <button className="cupTriviaBtn" onClick={this.coinflip}>Coinflip</button>
  </div>)
  }
}

export default connect(container.allState)(Tools)
