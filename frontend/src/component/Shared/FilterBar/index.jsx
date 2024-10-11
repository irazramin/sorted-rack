import React from "react";
import { ticketPriorities } from "../../../Pages/Tickets/utils/ticketPriorities";
import { ticketCategories } from "../../../Pages/Tickets/utils/ticketCategories";
import { ticketStatus } from "../../../Pages/Tickets/utils/ticketStatus";

const FilterSection = ({
  setQuery,
  handleSearchSubmit,
  layoutSetting,
  setLayoutSetting,
}) => {
  return (
    <div className="filter-section">
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="filter-select">
          <select
            name="category"
            id="category"
            onChange={(e) =>
              setQuery((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {ticketCategories?.map((category) => (
              <option value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-select">
          <select
            name="status"
            id="status"
            onChange={(e) =>
              setQuery((prevState) => ({
                ...prevState,
                status: e.target.value,
              }))
            }
          >
            <option value="" disabled selected>
              Select a status
            </option>
            {ticketStatus?.map((status) => (
              <option value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-select">
          <select
            name="priority"
            id="priority"
            onChange={(e) =>
              setQuery((prevState) => ({
                ...prevState,
                priority: e.target.value,
              }))
            }
          >
            <option value="" disabled selected>
              Select a priority
            </option>
            {ticketPriorities?.map((priority) => (
              <option value={priority.value}>{priority.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="filter-search">
        <form
          className=" d-flex align-items-center justify-content-between gap-2"
          action="#"
          onSubmit={handleSearchSubmit}
        >
          <input type="text" name="search" id="search" placeholder="Search.." />
          <button type="submit" className="common-button-square">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div className="layout-setting">
          <button
            className={`${layoutSetting === "table" ? "active" : ""}`}
            onClick={() => setLayoutSetting("table")}
          >
            <i class="bi bi-list-check"></i>
          </button>
          <button
            className={`${layoutSetting === "card" ? "active" : ""}`}
            onClick={() => setLayoutSetting("card")}
          >
            <i class="bi bi-grid-3x3-gap"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
