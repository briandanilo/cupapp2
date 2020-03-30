import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import container from "../containers/all.js"
import Deck from "card-deck";
import { StartingDeck } from "../models/deck";
import HandDisplay from "./HandDisplay";

const blackjack = require('engine-blackjack')
const actions = blackjack.actions
const Game = blackjack.Game
export {blackjack, actions, Game}

class Blackjack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentGame: new Game(),
      betAmount: 10
    }
  }


  buttonClick = (e) => {
    switch (e.target.value) {
      case "deal":
        this.state.currentGame.dispatch(actions.deal())
        this.setState({ currentGame: this.state.currentGame });
        break
      case "hit":
        this.state.currentGame.dispatch(actions.hit({position:"right"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "stand":
        this.state.currentGame.dispatch(actions.stand({position:"right"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "split":
        this.state.currentGame.dispatch(actions.split({position:"right"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "double":
        this.state.currentGame.dispatch(actions.double({position:"right"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "reset":
        this.setState({currentGame: new Game()})
        break
    }
  }

  splitHandButtonClick = (e) => {
    switch (e.target.value) {
      case "hit":
        this.state.currentGame.dispatch(actions.hit({position:"left"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "stand":
        this.state.currentGame.dispatch(actions.stand({position:"left"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "split":
        this.state.currentGame.dispatch(actions.split({position:"left"}))
        this.setState({ currentGame: this.state.currentGame });
        break
      case "double":
        this.state.currentGame.dispatch(actions.double({position:"left"}))
        this.setState({ currentGame: this.state.currentGame });
        break
    }
  }

  renderPlayerCards(){
    if (this.state.currentGame.state.handInfo.right.cards && !this.state.currentGame.state.handInfo.left.cards){
      let handArray = this.state.currentGame.state.handInfo.right.cards
      return handArray.map((i)=>{
        return <p>{i.text},</p>
      })
    } else if (this.state.currentGame.state.handInfo.right.cards && this.state.currentGame.state.handInfo.left.cards) {
      let handArrayRight = this.state.currentGame.state.handInfo.right.cards
      let handArrayLeft = this.state.currentGame.state.handInfo.left.cards
      return (<div>
        <p>Hand 1:{this.renderSplitCards(handArrayRight)}</p>
        <button className="btn btn-default tools-btn" value="hit" onClick={this.buttonClick}>Hit</button>
        <button className="btn btn-default tools-btn" value="stand" onClick={this.buttonClick}>Stand</button>
        <button className="btn btn-default tools-btn" value="double" onClick={this.buttonClick}>Double</button>
        <button className="btn btn-default tools-btn" value="split" onClick={this.buttonClick}>Split</button>
        <p>Hand 2:{this.renderSplitCards(handArrayLeft)}</p>
        <button className="btn btn-default tools-btn" value="hit" onClick={this.splitHandButtonClick}>Hit</button>
        <button className="btn btn-default tools-btn" value="stand" onClick={this.splitHandButtonClick}>Stand</button>
        <button className="btn btn-default tools-btn" value="double" onClick={this.splitHandButtonClick}>Hit</button>
        <button className="btn btn-default tools-btn" value="split" onClick={this.splitHandButtonClick}>Stand</button>
      </div>)
    }
  }

  renderSplitCards(handArray){
    return handArray.map((i)=>{
      return <p>{i.text},</p>
    })
  }

  renderDealerCards(){
    if (this.state.currentGame.state.dealerCards){
      let handArray = this.state.currentGame.state.dealerCards
      return handArray.map((i)=>{
        return <p>{i.text},</p>
      })
    }
  }

  // renderPlayerOptions(){
  //   if (this.state.currentGame.state.handInfo.right.availableActions){
  //     let availableActions = this.state.currentGame.state.handInfo.right.availableActions
  //     console.log("player available actions: ",availableActions)
  //   }
  // }

  renderBetAmount(){
    if (this.state.currentGame.state.initialBet)
      return <p>Bet: {this.state.currentGame.state.initialBet}</p>
    else
      return <p>Bet: {this.state.betAmount}</p>
  }

  renderOutcome(){
    if (this.state.currentGame.state.stage =="done"){
      let risk = this.state.currentGame.state.finalBet
      let win = this.state.currentGame.state.wonOnRight + this.state.currentGame.state.wonOnLeft
      return <p>Game Over.  Your net: {win - risk}</p>
    }
  }

  renderSplitHand(){
    if (this.state.currentGame.state.handInfo.left.cards){
      let handArray = this.state.currentGame.state.handInfo.left.cards
      return handArray.map((i)=>{
            return <p>{i.text},</p>
      })
    }
  }

  render() {
    console.log("game state at render: :",this.state.currentGame.getState())
    return (<div><Link to="/">Back to Homepage</Link>
      <div className="Component">
        <h1>Blackjack</h1>
        <button className="btn btn-default tools-btn" value="deal" onClick={this.buttonClick}>Deal</button>
        <button className="btn btn-default tools-btn" value="hit" onClick={this.buttonClick}>Hit</button>
        <button className="btn btn-default tools-btn" value="stand" onClick={this.buttonClick}>Stand</button>
        <button className="btn btn-default tools-btn" value="double" onClick={this.buttonClick}>Double</button>
        <button className="btn btn-default tools-btn" value="split" onClick={this.buttonClick}>Split</button>
        <button className="btn btn-default tools-btn" value="reset" onClick={this.buttonClick}>Play Again</button>
      </div>
      <div className = "Component">
        {this.renderBetAmount()}
      </div>
      <div className="Component">
        <p>Dealer</p>
          <div key="dealerHand" style={styles.handWrapper}>
          {this.renderDealerCards()}
        </div>
        <p>Player</p>
          <div key="playerHand" style={styles.handWrapper}>
          {this.renderPlayerCards()}
        </div>
        <div className = "Component">
          {this.renderOutcome()}
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
