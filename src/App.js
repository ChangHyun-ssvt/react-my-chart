import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "./App.css";

class App extends Component {
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
      this.setState({ chart: chartList, isLoading: false });
    });
  };

  chartList = () => {
    const { chart } = this.state;
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
            {chart.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={chart[index].album}
                      alt={chart[index].title}
                      title={chart[index].title}
                    ></img>
                  </td>
                  <td>{chart[index].title}</td>
                  <td>{chart[index].artist}</td>
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
      isLoading: true,
      chart: [],
    };
  }
  componentDidMount() {
    this.getHtml();
  }
  render() {
    const { isLoading } = this.state;

    return (
      <div className="App">
        {isLoading ? (
          <div>
            <h1>isLoading</h1>
          </div>
        ) : (
          <div>{this.chartList()}</div>
        )}
      </div>
    );
  }
}

export default App;
