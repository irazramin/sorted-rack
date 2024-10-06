import React from "react";
import "../style.scss";
import { Controller } from "react-hook-form";

const TextAreaField = ({
  control,
  name,
  label = "",
  placeholder,
  error = "",
  cols = 4,
  rows = 5,
}) => {
  return (
    <div className={`input-field ${error ? "error" : ""}`}>
      {label && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder={placeholder}
            cols={cols}
            rows={rows}
          />
        )}
      />
      {error && <div className="error-message">{error?.message}</div>}
    </div>
  );
};

export default TextAreaField;
