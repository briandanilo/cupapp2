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
    if (captain == 'Joe')
      return <div>{this.props.scorecard[1][0]}</div>
    else if (captain == 'Jen')
      return <div>{this.props.scorecard[1][1]}</div>

  }

  render () {
    if (!this.props.scorecard) {
      this.props.dispatch(callGoogleApi("scorecard"))
      return <div>Waiting for scorecard data...</div>
    } else
    return (<div>
      <div className="panel panel-default scorecard">
        <div className="panel-heading">
          <h3 className="panel-title">Team Joe</h3>
        </div>
        <div className="panel-body">
          {this.renderScore("Joe")}
        </div>
      </div>
      <div className="panel panel-default scorecard">
        <div className="panel-heading">
          <h3 className="panel-title">Team Jen</h3>
        </div>
        <div className="panel-body">
          {this.renderScore("Jen")}
        </div>
      </div>
    </div>);
  }
}

export default connect(container.allState)(Scorecard)
