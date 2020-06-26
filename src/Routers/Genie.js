import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

function Genie() {
  const [genieChart, setGenieChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = [
    "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200",
    "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200611&hh=14&rtm=Y&pg=2",
  ];
  const getChart = async () => {
    try {
      const top50 = await axios.get(url[0]);
      const top100 = await axios.get(url[1]);

      Promise.all([top50, top100]).then((values) => {
        values.map((value) => {
          setChart(value);
          return true;
        });
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setChart = (html) => {
    const chartList = [];
    const $ = cheerio.load(html.data);
    const $titleList = $("tr.list").children("td.info").children("a.title");
    const $artistList = $("tr.list").children("td.info").children("a.artist");
    const $albumList = $("tr.list")
      .children("td")
      .children("a.cover")
      .children("img");

    $titleList.map((i) => {
      chartList[i] = {
        title: $titleList[i].children[0].data.trim(),
        artist: $artistList[i].children[0].data,
        album: $albumList[i].attribs.src,
      };
    });
    setGenieChart(chartList);
    console.log("setChart", genieChart);
  };

  const chartList = () => {
    return (
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
          {genieChart.map((chart, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={chart.album}
                    alt={chart.title}
                    title={chart.title}
                  ></img>
                </td>
                <td>{chart.title}</td>
                <td>{chart.artist}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    getChart();
    return () => {};
  }, []);

  console.log("render", genieChart);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loading">
          <h2>Loading....</h2>
        </div>
      ) : (
        chartList()
      )}
    </div>
  );
}

export default Genie;
