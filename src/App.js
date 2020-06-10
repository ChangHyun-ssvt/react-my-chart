import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "./App.css";

const getChart = async () => {
  try {
    return await axios.get(
      "https://cors-anywhere.herokuapp.com/https://www.melon.com/chart/index.htm"
    );
  } catch (error) {
    console.error(error);
  }
};

const getHtml = () => {
  getChart().then((html) => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("div.rank01").children("span");

    bodyList.each((i, elem) => {
      console.log($(this).find("a"));
      titleList[i] = {
        title: $(this).find("a").text(),
      };
      // console.log(titleList[i]);
    });
    return titleList;
  });
};

class App extends Component {
  componentDidMount() {
    getHtml();
  }
  render() {
    return <div className="App">Hello World!</div>;
  }
}

export default App;
