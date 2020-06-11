import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Bugs from "../Routers/Bugs";
import Melon from "../Containers/MelonContainer";
import Genie from "../Routers/Genie";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Route path="/melon" component={Melon}></Route>
        <Route path="/bugs" component={Bugs}></Route>
        <Route path="/genie" component={Genie}></Route>
      </Router>
    );
  }
}
