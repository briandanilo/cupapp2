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
        <h4>Thursday</h4>
        <p>9pm - Drinks/Draft at Terminal Bar</p>
        <h4>Friday</h4>
        <p>7pm - Dinner in Winter Park rental house</p>
        <p>9pm - Team Game Event</p>
        <h4>Saturday</h4>
        <p>11am - Costume ski race</p>
        <p>12pm - Tailgate Lunch in Utah Junction Parking Lot </p>
        <p>2pm - UVA at Syracuse (ESPN3)</p>
        <p>7pm - Dinner at Denos</p>
        <h4>Sunday</h4>
        <p>4pm - Scavenger Hunt ends, Superbowl begins</p>
      </div>)
  }

}
export default connect(container.allState)(Schedule)
