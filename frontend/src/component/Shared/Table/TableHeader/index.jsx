import React from "react";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr className="bg-light">
        {headers?.map((header) => (
          <th scope="col" key={header}>
            {header}
          </th>
        ))}
        <th scope="col" className="text-center">
          <span>Action</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
