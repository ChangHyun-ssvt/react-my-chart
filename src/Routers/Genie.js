import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "../css/App.css";

class Genie extends Component {
  getChart = async (url) => {
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  };

  setChart = (html) => {
    let chartList = [];
    const $ = cheerio.load(html.data);
    const $titleList = $("tr.list").children("td.info").children("a.title");
    const $artistList = $("tr.list").children("td.info").children("a.artist");
    const $albumList = $("tr.list")
      .children("td")
      .children("a.cover")
      .children("img");

    $titleList.each((i, elem) => {
      chartList[i] = {
        title: $titleList[i].children[0].data.trim(),
        artist: $artistList[i].children[0].data,
        album: $albumList[i].attribs.src,
      };
      this.setState({ genieChart: this.state.genieChart.concat(chartList[i]) });
    });
  };

  getHtml = () => {
    const url = [
      "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200",
      "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200611&hh=14&rtm=Y&pg=2",
    ];
    url.map((url) => {
      this.getChart(url).then((html) => {
        this.setChart(html);
      });
    });
  };

  chartList = () => {
    const { genieChart } = this.state;
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
            {genieChart.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={genieChart[index].album}
                      alt={genieChart[index].title}
                      title={genieChart[index].title}
                    ></img>
                  </td>
                  <td>{genieChart[index].title}</td>
                  <td>{genieChart[index].artist}</td>
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
      genieChart: [],
    };
  }
  componentDidMount() {
    this.getHtml();
  }
  render() {
    return <div className="App">{<div>{this.chartList()}</div>}</div>;
  }
}

export default Genie;
