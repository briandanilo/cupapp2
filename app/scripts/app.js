import store from "./store.js";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppRoot from "./components/app_root.js";
import Transfer from "./components/Transfer.js";
import Scorecard from "./components/Scorecard.js";
import Expenses from "./components/Expenses.js";
import ExpenseHistory from "./components/ExpenseHistory.js";
import Jeopardy from "./components/Jeopardy.js";
import ChipHistory from "./components/ChipHistory.js";
import Cards from "./components/Cards.js";
import ExampleRoulette from "./components/Roulette";
import RoulettePicker from "./components/RoulettePicker";

const Nav = () => (
  <ul className="nav nav-pills nav-justified">
    <li role="presentation" className=""><Link to="/Scorecard">Scorecard</Link></li>
    <li role="presentation" className=""><Link to="/Expenses">Expenses</Link></li>
  </ul>
);

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
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
