import React, { Component } from "react";
import axios from "axios";
import cheerio from "cheerio";
import "../css/App.css";

class Bugs extends Component {
  getChart = async () => {
    try {
      return await axios.get(
        "https://cors-anywhere.herokuapp.com/https://music.bugs.co.kr/chart"
      );
    } catch (error) {
      console.error(error);
    }
  };

  getHtml = () => {
    this.getChart().then((html) => {
      let chartList = [];
      const $ = cheerio.load(html.data);
      const $titleList = $("th").children("p.title").children("a");
      const $artistList = $("td.left")
        .children("p.artist")
        .children("a:first-child");
      const $albumList = $("td").children("a.thumbnail").children("img");

      $titleList.each((i, elem) => {
        chartList[i] = {
          title: $titleList[i].children[0].data,
          artist: $artistList[i].children[0].data,
          album: $albumList[i].attribs.src,
        };
      });
      this.setState({ bugsChart: chartList });
    });
  };

  chartList = () => {
    const { bugsChart } = this.state;
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
            {bugsChart.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={bugsChart[index].album}
                      alt={bugsChart[index].title}
                      title={bugsChart[index].title}
                    ></img>
                  </td>
                  <td>{bugsChart[index].title}</td>
                  <td>{bugsChart[index].artist}</td>
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
      bugsChart: [],
    };
  }
  componentDidMount() {
    this.getHtml();
  }
  render() {
    return <div className="App">{<div>{this.chartList()}</div>}</div>;
  }
}

export default Bugs;
