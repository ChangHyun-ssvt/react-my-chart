import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Bugs from "../Routers/Bugs";
import Melon from "../Routers/Melon";
import Genie from "../Routers/Genie";
import Header from "./Header";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route exact path="/" component={Melon}></Route>
        <Route path="/melon" component={Melon}></Route>
        <Route path="/bugs" component={Bugs}></Route>
        <Route path="/genie" component={Genie}></Route>
      </Router>
    );
  }
}
