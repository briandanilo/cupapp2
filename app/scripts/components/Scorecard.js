import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import callGoogleApi from '../actions/googleApi.js'
import PropTypes from 'prop-types';

class Scorecard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    if (!this.props.scorecard) {
      this.props.dispatch(callGoogleApi("Scorecard"));
      return <div>Waiting for scorecard data...</div>
    } else
    return (<div className="ScorecardContainer Component"><h3>Scorecard</h3>
      <p className="scorecard-score">Team Fowler: {this.props.scorecard.TF}  --  Team Barnes: {this.props.scorecard.TB}</p>
    </div>);
  }
}

Scorecard.propTypes = {
  dispatch: PropTypes.func,
  scorecard: PropTypes.object,
};
//Red Team: {this.props.scorecard[0]} &nbsp;&nbsp;&nbsp;&nbsp; Blue Team: {this.props.scorecard[1]}

export default connect(container.allState)(Scorecard)
