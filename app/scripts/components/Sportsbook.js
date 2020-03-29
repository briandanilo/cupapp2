import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import container from '../containers/all.js'
import YouTube from 'react-youtube';

class Sportsbook extends React.Component {

  constructor(props) {
      super(props);
  }

  assignBet () {
    (Math.random() > .5) ? alert("You have the yankees!") : alert("You have the Dodgers")
  }


  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };


    return (<div>
      <YouTube
        videoId="hqZnPQnxO9U"
        opts={opts}
        onReady={this._onReady}
      />
      <button className="btn btn-default tools-btn" onClick={this.assignBet}>Dodgers or Yankees</button>
    </div>);
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }




}
export default connect(container.allState)(Sportsbook)
