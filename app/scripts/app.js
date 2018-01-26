import store from "./store.js";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppRoot from "./components/app_root.js";
import Transfer from "./components/Transfer.js";
import Scorecard from "./components/Scorecard.js";
import Expenses from "./components/Expenses.js"

const Nav = () => (
  <ul className="nav nav-pills nav-justified">
    <li role="presentation" className=""><Link to="/Scorecard">Scorecard</Link></li>
    <li role="presentation" className=""><Link to="/Expenses">Expenses</Link></li>
  </ul>
);

export default function app() {
  console.log(window.location.href)
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Scorecard} />
          <Route exact path="/Scorecard" component={Scorecard} />
          <Route exact path="/Expenses" component={Expenses} />
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
