import React from "react";
import "./style.scss";
const Button = ({ title, variant, onClick, disabled = false }) => {
  return (
    <button className={variant} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
