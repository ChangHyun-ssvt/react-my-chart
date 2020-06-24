import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";

function Melon() {
  const [melonChart, setMelonChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      const chartList = [];
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
      setMelonChart(chartList);
      setIsLoading(false);
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

export default Melon;
