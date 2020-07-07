import React, { useState } from "react";

function Data() {
  const [data, setData] = useState();
  fetch("/api/user/list")
    .then((res) => res.json())
    .then(
      (data) => setData(data),
      () => {
        console.log("data read : ", data);
      }
    );

  return <div></div>;
}

export default Data;
