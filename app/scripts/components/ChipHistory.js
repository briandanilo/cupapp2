import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import readChipBetHistory from '../actions/readChipBetHistory.js';
import moment from 'moment'

class ChipHistory extends React.Component {

  constructor(props) {
      super(props);
  }

  componentWillMount(){
    this.props.dispatch(readChipBetHistory())
  }

  formatTime(t){
    return moment(t).format('MM-DD hh:mm:ss a')
  }

  renderHistory(){
    if (this.props.chipHistory){
      var history = Array.from(this.props.chipHistory)
      history.filter((i)=>{
        return i.postTime
      })
      history.sort( (a,b) => {
        return a.postTime > b.postTime ? -1 : 1; // ascending order
      })
      return (
        history.map((i)=>{
          return (<p>{i.verifiedUser} lost {i.amount} to {i.transferee} ({this.formatTime(i.postTime)})</p>)
        })
      )
    }
  }

  renderTeamTotals(){
    if (this.props.teamTotals){
      return <h4>Team Barnes: {this.props.teamTotals.barnesTotal} vs Team Fowler: {this.props.teamTotals.fowlerTotal} </h4>
    }
  }

  renderCupperTotals(){
    if(this.props.chipCounts)
      return Object.keys(this.props.chipCounts).map((i)=>{
        var cupper = this.props.chipCounts[i]
        return (<p>{i} ({cupper.team}) - {cupper.chipCount}</p>)
      })
  }


  render(props) {

    return (<div>
        <Link to="/">Back to Homepage</Link>
        <h3>Chip Bet Totals</h3>
        {this.renderTeamTotals()}
        {this.renderCupperTotals()}
        <h3>Past Bets</h3>
        {this.renderHistory()}
      </div>)
  }

}
export default connect(container.allState)(ChipHistory)
