import React from "react";
import "../style.scss";
import { Controller } from "react-hook-form";

const InputField = ({ control, name, label, placeholder, error }) => {
  return (
    <div className={`input-field ${error ? "error" : ""}`}>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <input {...field} placeholder={placeholder} />}
      />
      {error && <div className="error-message">{error?.message}</div>}
    </div>
  );
};

export default InputField;
