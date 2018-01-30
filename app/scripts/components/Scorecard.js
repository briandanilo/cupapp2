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

  render () {
    if (!this.props.scorecard) {
      this.props.dispatch(callGoogleApi("Super Bowl"))
      return <div>Waiting for scorecard data...</div>
    } else
    return (<div className="ScorecardContainer Component"><h3>Scorecard</h3>
      <p className="scorecard-score">Red Team: {this.props.scorecard[0]} &nbsp;&nbsp;&nbsp;&nbsp; Blue Team: {this.props.scorecard[1]}</p>
    </div>);
  }
}

export default connect(container.allState)(Scorecard)
