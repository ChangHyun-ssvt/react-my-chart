import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../../Modules/genie";
import ChartList, { chartProps } from "./ChartList";
import Loading from "./Loading";
import { RootState } from "../../Modules/index";

function Genie() {
  const dispath = useDispatch();
  const genieChart = useSelector((state: RootState) => state.genie.genieChart);
  const isLoading = useSelector((state: RootState) => state.genie.isLoading);
  const url = [
    "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200",
    "https://cors-anywhere.herokuapp.com/https://www.genie.co.kr/chart/top200?&pg=2",
  ];

  const getChart = async () => {
    try {
      const top50: AxiosResponse<any> = await axios.get(url[0]);
      const top100: AxiosResponse<any> = await axios.get(url[1]);

      Promise.all([top50, top100]).then((values) => {
        values.map((value) => {
          setChart(value);
          return true;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setChart = (html: AxiosResponse<any>) => {
    const chartList: chartProps[] = [];
    const $ = cheerio.load(html.data);
    const $titleList = $("tr.list").children("td.info").children("a.title");
    const $artistList = $("tr.list").children("td.info").children("a.artist");
    const $albumList = $("tr.list")
      .children("td")
      .children("a.cover")
      .children("img");

    $titleList.each((i) => {
      chartList[i] = {
        title: $titleList[i].children[0].data,
        artist: $artistList[i].children[0].data,
        album: $albumList[i].attribs.src,
      };
    });
    dispath({
      type: type.INSERT,
      chart: chartList,
    });
  };

  useEffect(() => {
    document.title = "genie | MyChart";
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
            <img src="/images/logo_genie.png" alt="Genie 로고 이미지"></img>
          </p>
          {ChartList(genieChart)}
        </div>
      )}
    </div>
  );
}

export default Genie;
