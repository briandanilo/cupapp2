import store from "./store.js";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppRoot from "./components/app_root.js";
import ExpenseHistory from "./components/ExpenseHistory.js";
import Jeopardy from "./components/Jeopardy.js";
import ChipHistory from "./components/ChipHistory.js";
import Cards from "./components/Cards.js";
import RoulettePicker from "./components/RoulettePicker";
import Blackjack from "./components/Blackjack";
import Sportsbook from "./components/Sportsbook";

// const Nav = () => (
//   <ul className="nav nav-pills nav-justified">
//     <li role="presentation" className=""><Link to="/Scorecard">Scorecard</Link></li>
//     <li role="presentation" className=""><Link to="/Expenses">Expenses</Link></li>
//   </ul>
// );

export default function app() {
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={AppRoot} />
          <Route exact path="/expense-history" component={ExpenseHistory} />
          <Route exact path="/chip-history" component={ChipHistory} />
          <Route exact path="/jeopardy" component={Jeopardy} />
          <Route path="/cards" component={Cards} />
          <Route path="/roulette" component={RoulettePicker} />
          <Route path="/blackjack" component={Blackjack} />
          <Route path="/sportsbook" component={Sportsbook} />
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
