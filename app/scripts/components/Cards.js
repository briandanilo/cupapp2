import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { Hand, Card, CardBack } from 'react-deck-o-cards';
import fullDeck from './fullDeckOfCards.js'

class Cards extends React.Component {

  constructor(props) {
      super(props);
      this.getCard = this.getCard.bind(this);
      this.pickCardFromDeck = this.pickCardFromDeck.bind(this);
      this.state = {
        deck: fullDeck,
        player1cards: [
          { }
        ],
        player2cards: [
          { }
        ],
        player3cards: [
          { }
        ],
        player4cards: [
          { }
        ],
      };
  }

  getCard(e){
    switch (e.target.value) {
      case "player1":
        //var randomElement = Math.floor(Math.random() * currentDeck.length);
        var currentCards = this.state.player1cards
        currentCards.push(this.pickCardFromDeck())
        this.setState({player1cards: currentCards})
        break;
        break;
      case "player2":
        var currentCards = this.state.player2cards
        currentCards.push(this.pickCardFromDeck())
        this.setState({player2cards: currentCards})
        break;
      case "player3":
        var currentCards = this.state.player3cards
        currentCards.push(this.pickCardFromDeck())
        this.setState({player3cards: currentCards})
        break;
      case "player4":
        var currentCards = this.state.player4cards
        currentCards.push(this.pickCardFromDeck())
        this.setState({player4cards: currentCards})
        break;
    }
  }

  pickCardFromDeck(){
    var rank = Math.ceil(Math.random() * Math.ceil(13))
    var suit = Math.floor(Math.random() * Math.floor(3))
    console.log("rank: ",rank," suit: ",suit)
    return { rank:rank, suit:suit }
  }


  render () {
    console.log("current state: ",this.state)
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Component">
        <h1>Cards</h1>
        <button className="btn btn-default tools-btn" value="player1" onClick={this.getCard}>Deal Player 1</button>
        <button className="btn btn-default tools-btn" value="player2" onClick={this.getCard}>Deal Player 2</button>
        <button className="btn btn-default tools-btn" value="player3" onClick={this.getCard}>Deal Player 3</button>
        <button className="btn btn-default tools-btn" value="player4" onClick={this.getCard}>Deal Player 4</button>
      </div>
      <div className="Component">
        <p>Player 1:</p>
        <div className="CardBox">
          <Hand cards={this.state.player1cards} hidden={false}  />
        </div>
        <p>Player 2:</p>
        <div className="CardBox">
          <Hand cards={this.state.player2cards} hidden={false}  />
        </div>
        <p>Player 3:</p>
        <div className="CardBox">
          <Hand cards={this.state.player3cards} hidden={false}  />
        </div>
        <p>Player 4:</p>
        <div className="CardBox">
          <Hand cards={this.state.player4cards} hidden={false}  />
        </div>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Cards)
