import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Bugs from "../Components/Chart/Bugs";
import Melon from "../Components/Chart/Melon";
import Genie from "../Components/Chart/Genie";
import Header from "./Header";
import Register from "../Components/User/Register";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route exact path="/" component={Melon}></Route>
        <Route path="/melon" component={Melon}></Route>
        <Route path="/bugs" component={Bugs}></Route>
        <Route path="/genie" component={Genie}></Route>
        <Route path="/user/register" component={Register}></Route>
      </Router>
    );
  }
}
