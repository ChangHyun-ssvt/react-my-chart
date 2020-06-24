import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

function Genie() {
  const [genieChart, setGenieChart] = useState([]);
  const getChart = async (url) => {
    try {
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  };

  function setChart(html) {
    const chartList = [];
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
    });
    return chartList;
  }

  const getHtml = () => {
    let chartList = [];
    const url = [
      "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200",
      "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200611&hh=14&rtm=Y&pg=2",
    ];
    url.map((url) => {
      getChart(url).then((html) => {
        chartList = chartList.concat(setChart(html));
        setGenieChart(genieChart.concat(chartList));
      });
    });
  };

  const chartList = () => {
    return (
      <div>
        <table className="chart_table">
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

  useEffect(() => {
    getHtml();
  }, []);

  return <div>{chartList()}</div>;
}

export default Genie;
