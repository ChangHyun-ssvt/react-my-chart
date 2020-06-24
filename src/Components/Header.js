import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/melon">melon</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/bugs">bugs</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/genie">genie</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
