import React from 'react'
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import container from '../containers/all.js'
import callGoogleApi from '../actions/googleApi.js'

class Scorecard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {}
  }

  renderScore(captain){
    if (captain == 'Red')
      return <div>Red Team: {this.props.scorecard[0]}</div>
    else if (captain == 'Blue')
      return <div>Blue Team: {this.props.scorecard[1]}</div>

  }

  render () {
    if (!this.props.scorecard) {
      this.props.dispatch(callGoogleApi("Super Bowl"))
      return <div>Waiting for scorecard data...</div>
    } else
    return (<div><h3>Scorecard</h3>
          {this.renderScore("Red")}
          {this.renderScore("Blue")}
    </div>);
  }
}

export default connect(container.allState)(Scorecard)
