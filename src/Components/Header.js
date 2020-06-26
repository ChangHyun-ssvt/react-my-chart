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
              <Link to="/">MyChart</Link>
            </li>
            <li>
              <Link to="/melon">멜론</Link>
            </li>
            <li>
              <Link to="/bugs">벅스</Link>
            </li>
            <li>
              <Link to="/genie">지니</Link>
            </li>
          </ul>
          <ul className="nav_right">
            <li>
              <Link to="#">Menu1</Link>
            </li>
            <li>
              <Link to="#">Menu2</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
