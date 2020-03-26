import React from "react";
import Roulette from "./Roulette";
import { Link } from 'react-router-dom'

class RoulettePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardPicked: 0,
      customBoard: [],
    }
  }

  pickGame = e => {
    console.log(e.target.value);
    this.setState( {boardPicked: parseInt(e.target.value)});
    console.log(this.state);
  };

  render() {
    switch (this.state.boardPicked) {
      case 1:
        return (
          <Roulette />
        );
      case 2:
        return (
          <Roulette options={["Win 5", "Lose 1", "Lose 1", "Lose 2", "Lose 2", "Lose 1", "Win 5", "Lose 3"]} />
        );
      case 3:
        return (
          <Roulette options={["Win 3", "Lose 3", "Win 2", "Lose 2", "Win 1", "Lose 1", "Win 2", "Lose 2"]} />
        );
    }

    return (<div>
      <div><Link to="/">Back to Homepage</Link></div>
      <div>
        <button className="btn btn-default tools-btn" value="1" onClick={this.pickGame}>Easy Does It</button>
        <button className="btn btn-default tools-btn" value="2" onClick={this.pickGame}>Baron Special</button>
        <button className="btn btn-default tools-btn" value="3" onClick={this.pickGame}>As the World Turns</button>
      </div>
    </div>);

  }
}

export default RoulettePicker;
