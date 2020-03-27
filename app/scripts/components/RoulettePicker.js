import React from "react";
import Roulette from "./Roulette";
import { Link } from 'react-router-dom'

class RoulettePicker extends React.Component {
  constructor(props) {
    super(props);
    this.resetState = this.resetState.bind(this);
    this.initialState = {
      boardPicked: 0,
      customBoard: [],
    }
    this.state = this.initialState
  }

  pickGame = e => {
    console.log(e.target.value);
    this.setState( {boardPicked: parseInt(e.target.value)});
    console.log(this.state);
  };

  resetState(){
    this.setState(initialState)
  }

  render() {
    switch (this.state.boardPicked) {
      case 1:
        return (<div>
          <Link onClick={this.resetState} to="/roulette">Back to Roulette Options</Link>
          <Roulette /></div>
        );
      case 2:
        return (<div>
          <Link onClick={this.resetState} to="/roulette">Back to Roulette Options</Link>
          <Roulette options={["Win 5", "Lose 1", "Lose 1", "Lose 2", "Lose 2", "Lose 1", "Win 5", "Lose 3"]} /></div>
        );
      case 3:
        return (<div>
          <Link onClick={this.resetState} to="/roulette">Back to Roulette Options</Link>
          <Roulette options={["Win 3", "Lose 3", "Win 2", "Lose 2", "Win 1", "Lose 1", "Win 2", "Lose 2"]} /></div>
        );
    }

    return (<div>
      <Link to="/">Back to Homepage</Link>
      <div>
        <button className="btn btn-default tools-btn" value="1" onClick={this.pickGame}>Easy Does It</button>
        <button className="btn btn-default tools-btn" value="2" onClick={this.pickGame}>Baron Special</button>
        <button className="btn btn-default tools-btn" value="3" onClick={this.pickGame}>As the World Turns</button>
      </div>
    </div>);

  }
}

export default RoulettePicker;
