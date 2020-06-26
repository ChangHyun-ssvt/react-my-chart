import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul className="nav_left">
            <li>
              <Link to="/melon">melon</Link>
            </li>
            <li>
              <Link to="/bugs">bugs</Link>
            </li>
            <li>
              <Link to="/genie">genie</Link>
            </li>
          </ul>
          <ul className="nav_right">
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/">Register</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
