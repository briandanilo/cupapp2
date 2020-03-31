import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"
import Deck from "card-deck";
import { StartingDeck } from "../models/deck";
import HandDisplay from "./HandDisplay";

class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player1cards: [],
      player2cards: [],
      player3cards: [],
      player4cards: [],
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
      player1cards: [],
      player2cards: [],
      player3cards: [],
      player4cards: [],
      someDeck: new Deck(StartingDeck).shuffle(),
    });
  };

  getCard = e => {
    if (this.state.someDeck.remaining() < 1) {
      // TODO maybe notify that there are no cards left
      return;
    }
    let drawnCard = this.state.someDeck.draw();
    switch (e.target.value) {
      case "player1":
        this.setState({ player1cards: [...this.state.player1cards, drawnCard] });
        break;
      case "player2":
        this.setState({ player2cards: [...this.state.player2cards, drawnCard] });
        break;
      case "player3":
        this.setState({ player3cards: [...this.state.player3cards, drawnCard] });
        break;
      case "player4":
        this.setState({ player4cards: [...this.state.player4cards, drawnCard] });
        break;
    }
    if (!this.state.removeCards) {
      this.state.someDeck.addRandom(drawnCard);
    }
  };

  render() {
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Component">
        <h1>Cards</h1>
        <button className="btn btn-default tools-btn" value="player1" onClick={this.getCard}>Deal Player 1</button>
        <button className="btn btn-default tools-btn" value="player2" onClick={this.getCard}>Deal Player 2</button>
        <button className="btn btn-default tools-btn" value="player3" onClick={this.getCard}>Deal Player 3</button>
        <button className="btn btn-default tools-btn" value="player4" onClick={this.getCard}>Deal Player 4</button>
      </div>
      <div className="Component">
        <button className="btn btn-default tools-btn" value="player4" onClick={this.resetHands}>Reset</button>
        <button className="btn btn-default tools-btn" value="player4" onClick={this.toggleRemoveCards}>
          {this.state.removeCards && "Remove Cards" || "Don't Remove Cards"}
        </button>
      </div>
      <div className="Component">
        <p>Player 1:</p>
        <div key="player1hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.player1cards} />
        </div>
        <p>Player 2:</p>
        <div key="player2hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.player2cards} />
        </div>
        <p>Player 3:</p>
        <div key="player3hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.player3cards} />
        </div>
        <p>Player 4:</p>
        <div key="player4hand" style={styles.handWrapper}>
          <HandDisplay hand={this.state.player4cards} />
        </div>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Cards)

const styles = {
  handWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
};