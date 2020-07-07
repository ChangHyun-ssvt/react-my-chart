import React from "react";

const ChartList = (chartList: chartProps[]) => {
  return (
    <table className="chart_table">
      <colgroup>
        <col style={{ width: "10%" }}></col>
        <col style={{ width: "20%" }}></col>
        <col style={{ width: "40%" }}></col>
        <col style={{ width: "40%" }}></col>
      </colgroup>
      <thead>
        <tr>
          <th>순위</th>
          <th>앨범</th>
          <th>제목</th>
          <th>아티스트</th>
        </tr>
      </thead>
      <tbody>
        {chartList.map((chart: chartProps, index: number) => {
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

export default ChartList;

export type chartProps = {
  title?: string;
  artist?: string;
  album?: string;
};
