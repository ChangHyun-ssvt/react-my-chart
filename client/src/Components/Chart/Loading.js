import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Loding() {
  return (
    <div className="loading">
      <div className="spinner">
        <FontAwesomeIcon
          className="spinner"
          icon="spinner"
          size="5x"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Loding;
