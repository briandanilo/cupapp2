import React from 'react'
import { connect } from "react-redux";
import container from '../containers/all.js'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import readExpenseHistory from '../actions/readExpenseHistory.js';
import moment from 'moment'

class Schedule extends React.Component {

  constructor(props) {
      super(props);
  }

  componentWillMount(){
    //this.props.dispatch(readExpenseHistory())
  }

  formatTime(t){
    return moment(t).format('MM-DD hh:mm:ss a')
  }

  render(props) {
    return (<div className="ScheduleContainer Component">
        <h3>Schedule</h3>
        <h4>Friday</h4>
        <p>Arrive at 609 Sunnyside Ave, Park City, UT</p>
        <h4>Saturday</h4>
        <p>8:30am - Golf at Canyons Club</p>
        <p>Evening - poker, chip bets, merriment</p>
        <h4>Sunday</h4>
        <p>12:30pm - Golf at Park City Golf Course</p>
        <p>Evening - Bowling at Jupiter Bowl </p>
        <h4>Monday</h4>
        <p>12:30pm - Axe throwing in SLC</p>
        <p>4pm - Top Golf</p>
        <p>8pm - Trivia at Prohibition Bar</p>
        <h4>Tuesday</h4>
        <p>11am - Golf at Park City Golf Course</p>
      </div>)
  }

}
export default connect(container.allState)(Schedule)
