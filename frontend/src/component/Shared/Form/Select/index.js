import React from "react";
import { Controller } from "react-hook-form";
import "../style.scss";
const SelectField = ({ control, name, label, options, error }) => {
  return (
    <div className={`select-field ${error ? "error" : ""}`}>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div class="custom-select">
            <select {...field}>
              <option value="">Select an option</option>
              {options?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      {error && <div className="error-message">{error.message}</div>}
    </div>
  );
};

export default SelectField;
