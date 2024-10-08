import React from "react";
import "./style.scss";
const Title = ({ title, className = "", showDivider = true }) => {
  return (
    <>
      <h4 className={`${className} top-title`}>{title}</h4>
      {/* {showDivider && <hr />} */}
    </>
  );
};

export default Title;
