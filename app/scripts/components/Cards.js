import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { Hand, Card, CardBack } from 'react-deck-o-cards';

class Cards extends React.Component {

  constructor(props) {
      super(props);
      this.getCard = this.getCard.bind(this);
      this.getCard2 = this.getCard2.bind(this);
      this.pickCardFromDeck = this.pickCardFromDeck.bind(this);
      this.state = {
        player1cards: [
          { }
        ],
        player2cards: [
          { }
        ],
      };

  }

  getCard(){
    var onearray = this.state.player1cards
    onearray.push(this.pickCardFromDeck())
    this.setState({ player1cards: onearray })
  }

  getCard2(){
    var twoarray = this.state.player2cards
    twoarray.push(this.pickCardFromDeck())
    this.setState({ player2cards: twoarray })
  }

  pickCardFromDeck(){
    var rank = Math.ceil(Math.random() * Math.ceil(12))
    var suit = Math.floor(Math.random() * Math.floor(3))
    console.log("rank: ",rank," suit: ",suit)
    return { rank:rank, suit:suit }
  }

  render () {
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Component">
        <h1>Cards</h1>
        <button className="btn btn-default tools-btn" onClick={this.getCard}>Deal Player 1</button>
        <button className="btn btn-default tools-btn" onClick={this.getCard2}>Deal Player 2</button>
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
      </div>
    </div>);
  }
}
export default connect(container.allState)(Cards)
