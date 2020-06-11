import React, { Component } from "react";
import "../css/App.css";
import Routes from "./Routes";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
