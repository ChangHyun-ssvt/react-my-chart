import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

function Bugs() {
  const [bugsChart, setBugsChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getChart = async () => {
    try {
      return await axios.get(
        "https://cors-anywhere.herokuapp.com/https://music.bugs.co.kr/chart"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getHtml = () => {
    getChart().then((html) => {
      const chartList = [];
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
      setBugsChart(chartList);
      setIsLoading(false);
    });
  };

  const chartList = () => {
    return (
      <div className="container">
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
            {bugsChart.map((chart, index) => {
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
      </div>
    );
  };

  useEffect(() => {
    getHtml();
  }, []);

  return (
    <div>
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

export default Bugs;
