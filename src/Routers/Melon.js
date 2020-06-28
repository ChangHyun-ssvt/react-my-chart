import React, { useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../modules/melon";
import ChartList from "./ChartList";
import Loading from "./Loading";

function Melon() {
  const dispatch = useDispatch();
  const melonChart = useSelector((state) => state.melon.melonChart);
  const isLoading = useSelector((state) => state.melon.isLoading);
  const url =
    "https://cors-anywhere.herokuapp.com/https://www.melon.com/chart/index.htm";

  const getChart = async () => {
    try {
      const top100 = await axios.get(url);
      setChart(top100);
    } catch (error) {
      console.error(error);
    }
  };

  const setChart = (html) => {
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

    $titleList.each((i) => {
      chartList[i] = {
        title: $titleList[i].children[0].data,
        artist: $artistList[i].children[0].children[0].data,
        album: $albumList[i].attribs.src,
      };
    });
    dispatch({
      type: type.insert,
      chart: chartList,
    });
  };

  useEffect(() => {
    document.title = "Melon | MyChart";
    getChart();
    return () => {};
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        Loading()
      ) : (
        <div className="container_chart">
          <p>
            <img
              src="/images/logo_melon142x99.png"
              alt="MelOn 로고 이미지"
            ></img>
          </p>
          {ChartList(melonChart)}
        </div>
      )}
    </div>
  );
}

export default Melon;
