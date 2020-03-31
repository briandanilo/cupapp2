import React from "react"
import { connect } from "react-redux";
import container from "../containers/all.js"
import { Link } from "react-router-dom";
import readChipBetHistory from "../actions/readChipBetHistory.js";
import moment from "moment"
import PropTypes from 'prop-types';

class ChipHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(readChipBetHistory());
  }

  formatTime(t) {
    return moment(t).format("MM-DD hh:mm:ss a")
  }

  renderHistory() {
    if (this.props.chipHistory) {
      let history = Array.from(this.props.chipHistory);
      history.filter((i) => {
        return i.postTime
      });
      history.sort((a, b) => {
        return a.postTime > b.postTime ? -1 : 1; // ascending order
      });
      return (
        history.map((i) => {
          return (<p key={i}>{i.verifiedUser} lost {i.amount} to {i.transferee} ({this.formatTime(i.postTime)})</p>)
        })
      )
    }
  }

  renderTeamTotals() {
    if (this.props.teamTotals) {
      return <h4>Team Barnes: {this.props.teamTotals.barnesTotal} vs Team
        Fowler: {this.props.teamTotals.fowlerTotal} </h4>
    }
  }

  renderCupperTotals() {
    if (this.props.chipCounts)
      return Object.keys(this.props.chipCounts).map((i) => {
        let cupper = this.props.chipCounts[i];
        return (<p key={i}>{i} ({cupper.team}) - {cupper.chipCount}</p>)
      })
  }

  render() {
    return (<div>
      <Link to="/">Back to Homepage</Link>
      <h3>Chip Counts</h3>
      {this.renderTeamTotals()}
      {this.renderCupperTotals()}
      <h3>Past Bets</h3>
      {this.renderHistory()}
    </div>)
  }

}

ChipHistory.propTypes = {
  dispatch: PropTypes.func,
  chipHistory: PropTypes.object,
  chipCounts: PropTypes.object,
  teamTotals: PropTypes.object,
};


export default connect(container.allState)(ChipHistory)
