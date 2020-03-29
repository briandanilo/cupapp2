import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"
import fullDeck from "./fullDeckOfCards.js"
import Deck from "card-deck";
import { StartingDeck } from "../models/deck";
import HandDisplay from "./HandDisplay";

class Blackjack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: fullDeck,
      dealerCards: [],
      playerCards: [],
      someDeck: new Deck(StartingDeck).shuffle(),
      removeCards: false,
    };
  }

  toggleRemoveCards = () => {
    this.resetHands();
    this.setState( {removeCards: !this.state.removeCards});
  };

  resetHands = () => {
    this.setState({
      deck: fullDeck,
      dealerCards: [],
      playerCards: [],
      someDeck: new Deck(StartingDeck).shuffle(),
      removeCards: true,
    });
  };

  deal = () => {
    if (!this.state.dealerCards.length)
    {
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
  }

  addStandButton = () => {
    if (this.state.dealerCards.length)
    return (
      <button className="btn btn-default tools-btn" onClick={this.stand}>Stand
      </button>)
    else
      return (<div></div>)
  }

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
        <p>Dealer</p>
        <div key="player1hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.dealerCards} />
        </div>
        <p>Player</p>
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
