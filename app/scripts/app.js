import store from "./store.js";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import AppRoot from "./components/app_root.js";
import Transfer from "./components/Transfer.js";
import Scorecard from "./components/Scorecard.js";

const Nav = () => (
  <ul className="nav nav-pills nav-justified">
    <li role="presentation" className=""><Link to="/Transfer">Transfer</Link></li>
    <li role="presentation" className=""><Link to="/Scorecard">Scorecard</Link></li>
  </ul>
);

export default function app() {
  //console.log(store)
  render(
    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={Scorecard} />
          <Route exact path="/Transfer" component={Transfer} />
          <Route exact path="/Scorecard" component={Scorecard} />
        </div>
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}
