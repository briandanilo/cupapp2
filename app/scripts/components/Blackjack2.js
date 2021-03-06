import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"
import Deck from "card-deck";
import { StartingDeck } from "../models/deck";
import HandDisplay from "./HandDisplay";

class Blackjack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dealerCards: [],
      playerCards: [],
      dealerTotal: 0,
      playerTotal: 0,
      someDeck: new Deck(StartingDeck).shuffle(),
      removeCards: false,
    };
  }

  toggleRemoveCards = () => {
    this.resetHands();
    this.setState({ removeCards: !this.state.removeCards });
  };

  resetHands = () => {
    this.setState({
      dealerCards: [],
      playerCards: [],
      someDeck: new Deck(StartingDeck).shuffle(),
      removeCards: true,
    });
  };

  deal = () => {
    if (!this.state.dealerCards.length) {
      let dealer1 = this.state.someDeck.draw();
      let dealer2 = this.state.someDeck.draw();
      let player1 = this.state.someDeck.draw();
      let player2 = this.state.someDeck.draw();
      this.setState({ dealerCards: [...this.state.dealerCards, dealer1, dealer2] });
      this.setState({ playerCards: [...this.state.playerCards, player1, player2] });
    } else {
      let player1 = this.state.someDeck.draw();
      this.setState({ playerCards: [...this.state.playerCards, player1] });
    }
  };

  stand = () => {
    this.resetHands()
  };

  addStandButton = () => {
    if (this.state.dealerCards.length)
      return (
        <button className="btn btn-default tools-btn" onClick={this.stand}>Stand
        </button>);
    else
      return (<div />)
  };

  calcScore = (handArray) => {
    let score = 0;
    handArray.forEach((i) => {
      if (i.rank === 12)
        score += 1;
      else if (i.rank > 7)
        score += 10;
      else
        score += i.rank + 2;
    });
    return score
  };

  dealerScore = () => {
    return this.calcScore(this.state.dealerCards);
  };

  playerScore = () => {
    return this.calcScore(this.state.playerCards);
  };

  render() {
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Component">
        <h1>Blackjack</h1>
        <button className="btn btn-default tools-btn" onClick={this.deal}>
          {this.state.dealerCards.length && "Hit" || "Deal"}
        </button>
        {this.addStandButton()}
      </div>
      <div className="Component">
        <p>Dealer ({this.dealerScore()})</p>
        <div key="player1hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.dealerCards} />
        </div>
        <p>Player ({this.playerScore()})</p>
        <div key="player2hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.playerCards} />
        </div>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Blackjack)

const styles = {
  handWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
};
