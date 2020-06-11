import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "../css/App.css";

class Melon extends Component {
  getChart = async () => {
    try {
      return await axios.get(
        "https://cors-anywhere.herokuapp.com/https://www.melon.com/chart/index.htm"
      );
    } catch (error) {
      console.error(error);
    }
  };

  getHtml = () => {
    this.getChart().then((html) => {
      let chartList = [];
      const $ = cheerio.load(html.data);
      const $titleList = $("div.wrap_song_info")
        .children("div.rank01")
        .children("span")
        .children("a");
      const $artistList = $("div.wrap_song_info")
        .children("div.rank02")
        .children("span");
      const $albumList = $("div.wrap").children("a").children("img");

      $titleList.each((i, elem) => {
        chartList[i] = {
          title: $titleList[i].children[0].data,
          artist: $artistList[i].children[0].children[0].data,
          album: $albumList[i].attribs.src,
        };
      });
      this.setState({ melonChart: chartList });
    });
  };

  chartList = () => {
    const { melonChart } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>앨범</th>
              <th>제목</th>
              <th>아티스트</th>
            </tr>
          </thead>
          <tbody>
            {melonChart.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={melonChart[index].album}
                      alt={melonChart[index].title}
                      title={melonChart[index].title}
                    ></img>
                  </td>
                  <td>{melonChart[index].title}</td>
                  <td>{melonChart[index].artist}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      melonChart: [],
    };
  }
  componentDidMount() {
    this.getHtml();
  }
  render() {
    return (
      <div className="App">
        <div>{this.chartList()}</div>
      </div>
    );
  }
}

export default Melon;
