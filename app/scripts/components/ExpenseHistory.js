import React from "react"
import { connect } from "react-redux";
import container from "../containers/all.js"
import { Link } from "react-router-dom";
import readExpenseHistory from "../actions/readExpenseHistory.js";
import moment from "moment"
import PropTypes from "prop-types";

class ExpenseHistory extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(readExpenseHistory())
  }

  formatTime(t) {
    return moment(t).format("MM-DD hh:mm:ss a")
  }

  renderHistory() {
    if (this.props.expenseHistory) {
      let history = Array.from(this.props.expenseHistory);
      history.filter((i) => {
        return i.postTime
      });
      history.sort((a, b) => {
        return a.postTime > b.postTime ? -1 : 1; // ascending order
      });
      return (
        history.map((i) => {
          return (<p key={i}>{i.user} paid ${i.amount} for {i.description} ({this.formatTime(i.postTime)})</p>)
        })
      )
    }
  }

  render() {
    return (<div>
      <Link to="/">Back to Homepage</Link>
      <h3>Expense History</h3>
      {this.renderHistory()}
    </div>)
  }

}

ExpenseHistory.propTypes = {
  dispatch: PropTypes.func,
  expenseHistory: PropTypes.object,
};

export default connect(container.allState)(ExpenseHistory)
