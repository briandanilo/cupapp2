import React from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import container from "../containers/all.js"

class Tools extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  cupTrivia() {
    let triviaArray = [
      "winter is the coldest season",
      "the winter cup email thread reached 204 emails before the draft",
      "baron",
      "coupe is french for 'cup'",
      "richard nixon freed china",
      "curtis browning",
    ];
    let rand = Math.floor(Math.random() * triviaArray.length);
    // fetch("http://jservice.io/api/random");
    // What, this is insanity that you are going to the web for a random number
    alert("did you know that..." + triviaArray[rand]);
  }

  coinflip() {
    (Math.random() > .5) ? alert("heads") : alert("tails")
  }

  render() {
    return (<div className="ToolsContainer Component">
      <h3>Tools</h3>
      <button className="btn btn-default tools-btn" onClick={this.cupTrivia}>Cup Trivia</button>
      <button className="btn btn-default tools-btn" onClick={this.coinflip}>Coinflip</button>
      <Link className="btn btn-default tools-btn" to="/jeopardy">Jeopardy</Link>
      <Link className="btn btn-default tools-btn" to="/cards">Cards</Link>
      <Link className="btn btn-default tools-btn" to="/roulette">Roulette</Link>
      <Link className="btn btn-default tools-btn" to="/blackjack">Blackjack</Link>
      <Link className="btn btn-default tools-btn" to="/sportsbook">Sportsbook</Link>
    </div>)
  }
}

export default connect(container.allState)(Tools)
